import pymysql
import json
import hashlib
from re import IGNORECASE, sub

import cache_handler
import wiki_api
import tool_db
import wiki_db
from time import time, sleep

#vēl vajadzētu rate limiter

class RequestHandler:
	cache = None
	apiInst = None

	def setAPIInst(self):
		if self.apiInst is None:
			self.apiInst = wiki_api.WikiAPI()

	def cleanFilterParams(self, lang, data):
		self.setAPIInst()
		
		nsData = self.apiInst.getWikipediaNamespaces(lang)

		returnArr = []

		for filterItem in data:
			filterType = filterItem['type']
			if filterType == 'petscan':
				returnArr.append(filterItem)
				continue

			currTitle = filterItem['specific']['title'].strip()
			
			namespaces = nsData[filterType]
			if len(namespaces)>0:
				searchString = r"^("+'|'.join(namespaces)+")\:(.*)"
				currTitle = sub(searchString,r'\2',currTitle, IGNORECASE)
			
			currTitle = currTitle[:1].upper() + currTitle[1:]
			filterItem['specific'].update({'title':currTitle})
			returnArr.append(filterItem)
		
		return returnArr

	def checkIfValidLanguages(self, fromLang, toLang):
		self.setAPIInst()

		allWikiLanguages = self.apiInst.getWikipediaLanguages()

		if fromLang not in allWikiLanguages or toLang not in allWikiLanguages:
			return False
		
		return True


	def generateHashForInputData(self, data):
		#https://stackoverflow.com/questions/5884066/hashing-a-dictionary
		dataForHash = data.copy()

		if 'ignoreCache' in dataForHash:
			del dataForHash['ignoreCache']

		requestInputString = json.dumps(dataForHash, sort_keys=True)
		reqHash = hashlib.md5(requestInputString.encode())
		return reqHash.hexdigest()
	
	def main(self, inputParams):
		startTime = time()

		fromLang = inputParams['from']
		toLang = inputParams['to']

		isLanguagesValid = self.checkIfValidLanguages(fromLang, toLang)

		if not isLanguagesValid:
			return {
			'success': False,
			'meta': {
				'message': 'Languages not recognised'
			}
		}

		normalizedFilter = self.cleanFilterParams(fromLang, inputParams['filters'])
		inputParams['filters'] = normalizedFilter

		reqHash = self.generateHashForInputData(inputParams)
		
		toolDB = tool_db.ToolDB()

		reqID = toolDB.getRequestID(reqHash)

		##šeit vēl jāpārbauda, vai nav saglabāts DB

		self.cache = cache_handler.CacheHandler()

		cacheResult = self.cache.get(reqHash)
		
		requestData = None
		isCached = False
		debugLine = False
		haveToIgnoreCache = inputParams['ignoreCache'] if 'ignoreCache' in inputParams else False

		if haveToIgnoreCache:
			db_inst = wiki_db.WikiDB(inputParams['from'],inputParams['to'])
			dbRes = db_inst.main(inputParams['filters'])
			resultFromDB = dbRes['data']
			notifyAboutIncompleteresults = dbRes['wasMaxStatementTime']
			isCached = False
			debugLine = True
			self.cache.setData(reqHash, resultFromDB)
			
			requestData = resultFromDB

		elif cacheResult:
			requestData = cacheResult
			notifyAboutIncompleteresults = False
			isCached = True
			cacheAge = self.cache.ttl(reqHash)

		else:
			db_inst = wiki_db.WikiDB(inputParams['from'],inputParams['to'])
			dbRes = db_inst.main(inputParams['filters'])
			resultFromDB = dbRes['data']
			notifyAboutIncompleteresults = dbRes['wasMaxStatementTime']
			isCached = False
			debugLine = True
			self.cache.setData(reqHash, resultFromDB)
			
			requestData = resultFromDB
		
		if not reqID:
			reqID = toolDB.saveRequestData(inputParams['from'],inputParams['to'],inputParams, reqHash)
		
		endTime = time()
		reqTime = endTime - startTime
		
		return {
			'data': requestData,
			'success': True,
			'meta': {
				'debugLine': debugLine,
				'time': "{0:.2f}".format(reqTime),
				'id': reqID,
				'reachedMaxStatementTime': notifyAboutIncompleteresults,
				'cached': isCached,
				'cache_age': None if not isCached else (self.cache.expireTime - cacheAge)
			}
		}
		
		#return self.fromCategory
#
if __name__ == '__main__':
	inst = RequestHandler()
	filters = [
		{ 'type': 'category', 'specific': { 'title': '1957 births', 'depth': 5, 'talk': False } },
		{ 'type': 'category', 'specific': { 'title': 'Category:1957 births', 'depth': 5, 'talk': False } },
		{ 'type': 'template', 'specific': { 'talk': False, 'title': 'infobox park' } },
		{ 'type': 'petscan', 'specific': { 'id': '' } }
	]
	
	#cleanFilters = inst.cleanFilterParams('en',filters)
	#print(cleanFilters)
	res = inst.main({ 'from':'en','to':'lv', 'ignoreCache': True, 'filters': filters })
	print(res)