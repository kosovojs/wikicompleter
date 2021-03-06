import pymysql
import os
from config import IS_DEV
import yaml
from time import sleep

class WikiDB:
	conn = None
	reachedMaxStatementTime = False
	langFrom = 'en'
	langTo = 'lv'
	oneChunkSize = 50

	def __init__(self, languageFrom: str, languageTo: str):
		self.langFrom = languageFrom
		self.langTo = languageTo
		self.connect()
	
	def formatCategory(self, inputStr):
		return inputStr.replace(' ','_')
	
	def encode_if_necessary(self, b):
		if type(b) is bytes:
			return b.decode('utf8')
		return b

	def whereIn(self, arguments):
		try:
			return ','.join(['%s']*len(arguments))
		except:
			print('whereIn ex ',arguments)
			exit()
	
	def connect(self):
		try:
			if IS_DEV:
				config = yaml.safe_load(open('db_local.yaml'))
				self.conn = pymysql.connect(host=config['host'], user=config['user'], password=config['password'], port=config['port'], database=self.langFrom+'wiki_p', charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
			else:
				self.conn = pymysql.connect( database=self.langFrom+'wiki_p', host=self.langFrom+'wiki.web.db.svc.eqiad.wmflabs', read_default_file=os.path.expanduser("~/replica.my.cnf"), charset='utf8mb4' , cursorclass=pymysql.cursors.DictCursor)
			
			with self.conn.cursor() as cursor:
				cursor.execute('SET SESSION MAX_STATEMENT_TIME=300;')#5 minutes = 300

		except pymysql.Error as e:
			print('e:', e)
			exit()
	
	def runQuery(self, sql: str, params: tuple = (), maxTries: int = 2) -> dict:
		if maxTries == 0:
			return []

		try:
			with self.conn.cursor() as cursor:
				cursor.execute(sql, params)
				result = cursor.fetchall()
				return result
		except pymysql.Error as e:
			errorCode = str(e)
			if 'Query execution was interrupted' in errorCode:#Query execution was interrupted (max_statement_time exceeded)
				self.reachedMaxStatementTime = True
				return []
			
			if 'max_user_connections' in errorCode:#User %s already has more than 'max_user_connections' active connections
				import random
				sleep(random.uniform(10, 60))
				return self.runQuery(sql, params, maxTries-1)

			return []
		
	def getSubcategories(self, rootcategories: list, currentCategoryList: list, depth: int):
		if depth == 0:
			return currentCategoryList
			
		sqlTemplate = "SELECT page_title FROM categorylinks cl join page p on p.page_id=cl.cl_from WHERE cl_to IN ({}) AND cl_type='subcat'"
		
		categoriesPreparedForSQL = [self.formatCategory(f) for f in rootcategories]
		
		if len(categoriesPreparedForSQL) == 0:
			return []
		
		sqlTemplateFormatted = sqlTemplate.format(self.whereIn(categoriesPreparedForSQL))

		result = self.runQuery(sqlTemplateFormatted, tuple(categoriesPreparedForSQL))
		
		if len(result) == 0:
			return currentCategoryList

		currLevel = [self.encode_if_necessary(f['page_title']) for f in result]

		currentCategoryList.extend(currLevel)

		depth -= 1

		return self.getSubcategories(currLevel, currentCategoryList, depth)
	
	def handleCategory(self, category, depth):
		formattedCategory = self.formatCategory(category)
		subcategories = self.getSubcategories([formattedCategory], [formattedCategory], int(depth))
		
		sqlSubquery = 'select l.ll_from from categorylinks cla where cla.cl_type="page" and l.ll_from=cla.cl_from and cla.cl_to in ({})'
		sqlSubqueriesParams = subcategories
		
		return {
			'query':sqlSubquery.format(self.whereIn(subcategories)),
			'params': sqlSubqueriesParams
		}
	
	def handleTemplate(self, title):
		formattedCategory = self.formatCategory(title)
		
		sqlSubquery = 'select l.ll_from from templatelinks tl where l.ll_from=tl.tl_from and tl_namespace=10 and tl.tl_from_namespace=0 and tl.tl_title=%s'
		
		return {
			'query':sqlSubquery,
			'params': [formattedCategory]
		}

	def makeOneLanglinksSubquery(self, subQuery, subParams):
		tpl = """select ll_from, count(l.ll_lang) as langs
			from langlinks l
			where not exists (select * from langlinks m where m.ll_from=l.ll_from and m.ll_lang=%s)
				and exists ({})
  			group by l.ll_from"""

		finalQuery = tpl.format(subQuery)
		finalParams = [self.langTo]
		finalParams.extend(subParams)

		return {
			'query':finalQuery,
			'params': finalParams
		}

	def getLanglinksForPageIds(self, pages):
		tpl = """select ll_from, count(l.ll_lang) as langs
			from langlinks l
			where not exists (select * from langlinks m where m.ll_from=l.ll_from and m.ll_lang=%s)
				and ll_from in ({})
  			group by l.ll_from"""

		finalQuery = tpl.format(self.whereIn(pages))
		finalParams = [self.langTo]
		finalParams.extend(pages)
		
		result = self.runQuery(finalQuery, tuple(finalParams))

		return {f['ll_from']:f['langs'] for f in result}

	def handlePetscan(self, id):
		import requests, json
		response = requests.get('http://petscan.wmflabs.org/?psid={}&format=json'.format(id))

		if not response.status_code == 200:
			return {}
		
		try:
			data = response.json()['*'][0]['a']['*']

			pageIds = [f['id'] for f in data]

			chunks = self.chunker(pageIds, self.oneChunkSize)
			
			idMappingToTitles = {}
			
			for chunk in chunks:
				currRes = self.getLanglinksForPageIds(chunk)
				idMappingToTitles.update(currRes)
		except:
			return {}
		
		return idMappingToTitles
		

	def mainLanglinksQuery(self, params):
		tpl = """select ll_from, langs from ({}) tablea order by langs desc limit 500"""

		allInfo = []
		if 'category' in params:
			allInfo.extend([self.makeOneLanglinksSubquery(categoryInfo['query'], categoryInfo['params']) for categoryInfo in params['category']])
		if 'template' in params:
			allInfo.extend([self.makeOneLanglinksSubquery(templateInfo['query'], templateInfo['params']) for templateInfo in params['template']])
			
		allSubqueriesData = allInfo
		
		res = {}

		if len(allSubqueriesData)>0:
			
			allSubqueries = [f['query'] for f in allSubqueriesData]
			allParams = [f['params'] for f in allSubqueriesData]
			
			finalQuery = tpl.format(" union ".join(allSubqueries))
			finalParams = [item for sublist in allParams for item in sublist]
			result = self.runQuery(finalQuery, tuple(finalParams))
			res = {f['ll_from']:f['langs'] for f in result}
		
		if 'petscan' in params:
			for petscanInfo in params['petscan']:
				petscanResult = self.handlePetscan(petscanInfo)
				res.update(petscanResult)
		
		return res

	''' def mainLanglinksQuery(self, categoryInfo, templateInfo):
		tpl = """select ll_from, count(l.ll_lang) as langs
		from langlinks l
		where not exists (select * from langlinks m where m.ll_from=l.ll_from and m.ll_lang=%s)
			and ({})
		group by l.ll_from
		order by count(l.ll_lang) desc
		limit 500"""

		subQuery = "exists ({}) or exists ({})".format(categoryInfo['query'], templateInfo['query'])

		finalQuery = tpl.format(subQuery)
		finalParams = [self.langTo]
		finalParams.extend(categoryInfo['params'])
		finalParams.extend(templateInfo['params'])

		print(finalQuery)
		print('params',finalParams)
		#exit()

		result = self.runQuery(finalQuery, tuple(finalParams))
		print('query finished')
		exit()
		
		return {f['ll_from']:f['langs'] for f in result} '''

	def chunker(self, seq, size):
		return (seq[pos:pos + size] for pos in range(0, len(seq), size))

	def getPageInfoForPages(self, pages):
		sqlTpl = """select page_id as pageId, page_title as title from page p where p.page_namespace=0 and p.page_is_redirect=0 and p.page_id in ({})"""
		sql = sqlTpl.format(self.whereIn(pages))
		result = self.runQuery(sql, tuple(pages))

		return {f['pageId']:self.encode_if_necessary(f['title']) for f in result}

	def getPageInfoInBatches(self, pages):
		chunks = self.chunker(pages, self.oneChunkSize)
		
		idMappingToTitles = {}
		
		for chunk in chunks:
			currRes = self.getPageInfoForPages(chunk)
			idMappingToTitles.update(currRes)
		
		return idMappingToTitles
		
	def main(self, inputData):# = { 'title': '1957 births', 'depth': 5, 'tplTitle': 'Infobox park' }
		#return [['Shavkat_Mirziyoyev', 62], ['Jackie_Shroff', 61], ['Bernie_Mac', 56], ['Melanie_Griffith', 56], ['Wolfgang_Ketterle', 56], ['Goodluck_Jonathan', 54], ['Dani_Rodrik', 52], ['Mukesh_Ambani', 48],['Shavkat_Mirziyoyev', 62], ['Jackie_Shroff', 61], ['Bernie_Mac', 56], ['Melanie_Griffith', 56], ['Wolfgang_Ketterle', 56], ['Goodluck_Jonathan', 54], ['Dani_Rodrik', 52], ['Mukesh_Ambani', 48],['Shavkat_Mirziyoyev', 62], ['Jackie_Shroff', 61], ['Bernie_Mac', 56], ['Melanie_Griffith', 56], ['Wolfgang_Ketterle', 56], ['Goodluck_Jonathan', 54], ['Dani_Rodrik', 52], ['Mukesh_Ambani', 48],['Shavkat_Mirziyoyev', 62], ['Jackie_Shroff', 61], ['Bernie_Mac', 56], ['Melanie_Griffith', 56], ['Wolfgang_Ketterle', 56], ['Goodluck_Jonathan', 54], ['Dani_Rodrik', 52], ['Mukesh_Ambani', 48],['Shavkat_Mirziyoyev', 62], ['Jackie_Shroff', 61], ['Bernie_Mac', 56], ['Melanie_Griffith', 56], ['Wolfgang_Ketterle', 56], ['Goodluck_Jonathan', 54], ['Dani_Rodrik', 52], ['Mukesh_Ambani', 48],['Shavkat_Mirziyoyev', 62], ['Jackie_Shroff', 61], ['Bernie_Mac', 56], ['Melanie_Griffith', 56], ['Wolfgang_Ketterle', 56], ['Goodluck_Jonathan', 54], ['Dani_Rodrik', 52], ['Mukesh_Ambani', 48],['Shavkat_Mirziyoyev', 62], ['Jackie_Shroff', 61], ['Bernie_Mac', 56], ['Melanie_Griffith', 56], ['Wolfgang_Ketterle', 56], ['Goodluck_Jonathan', 54], ['Dani_Rodrik', 52], ['Mukesh_Ambani', 48],['Shavkat_Mirziyoyev', 62], ['Jackie_Shroff', 61], ['Bernie_Mac', 56], ['Melanie_Griffith', 56], ['Wolfgang_Ketterle', 56], ['Goodluck_Jonathan', 54], ['Dani_Rodrik', 52], ['Mukesh_Ambani', 48],['Shavkat_Mirziyoyev', 62], ['Jackie_Shroff', 61], ['Bernie_Mac', 56], ['Melanie_Griffith', 56], ['Wolfgang_Ketterle', 56], ['Goodluck_Jonathan', 54], ['Dani_Rodrik', 52], ['Mukesh_Ambani', 48],['Shavkat_Mirziyoyev', 62], ['Jackie_Shroff', 61], ['Bernie_Mac', 56], ['Melanie_Griffith', 56], ['Wolfgang_Ketterle', 56], ['Goodluck_Jonathan', 54], ['Dani_Rodrik', 52], ['Mukesh_Ambani', 48]]

		subQueryParams = {'category':[], 'template':[], 'petscan': []}
		for reqParam in inputData:
			reqType = reqParam['type']
			reqSpecifics = reqParam['specific']
			if reqType == 'category':
				subQueryParams['category'].append(self.handleCategory(reqSpecifics['title'], reqSpecifics['depth']))
			elif reqType == 'template':
				subQueryParams['template'].append(self.handleTemplate(reqSpecifics['title']))
			elif reqType == 'petscan':
				subQueryParams['petscan'].append(reqSpecifics['id'])
		
		#categoryInfo = self.handleCategory(inputData['title'], inputData['depth'])
		#templateInfo = self.handleTemplate(inputData['tplTitle'])

		pageIdMappingToLanglinks = self.mainLanglinksQuery(subQueryParams)

		pageIDs = list(pageIdMappingToLanglinks)
		
		pageIdMappingToTitles = self.getPageInfoInBatches(pageIDs)

		finalResult = []

		for pageID in pageIdMappingToLanglinks:
			if pageID not in pageIdMappingToTitles:#it may be non-article page ...or a bug
				#print("not found: ",pageID)
				continue
				
			finalResult.append([pageIdMappingToTitles[pageID], pageIdMappingToLanglinks[pageID]])
		#
		finalResult.sort(key=lambda x: (-x[1], x[0]))

		#print(finalResult)

		return {'data':finalResult,'wasMaxStatementTime':self.reachedMaxStatementTime}
		#return self.fromCategory
#
#inst = WikiDB('en','lv')
""" inst.main([
			{ 'type': 'category', 'specific': { 'title': '1957 births', 'depth': 0, 'talk': False } },
			{ 'type': 'template', 'specific': { 'title': 'Infobox park', 'talk': False } },
			{ 'type': 'petscan', 'specific': { 'id': '' } }
		]) """#'from':'en','to':'lv', 'ignoreCache': True, 