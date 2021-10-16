from pywikiapi import wikipedia
import cache_handler

tplNS = '10'
catNS = '14'

class WikiAPI:
	def getWikipediaNamespaces(self, language):
		cache = cache_handler.CacheHandler()
		cacheResult = cache.get('{}-siteinfo'.format(language))

		if cacheResult:
			return cacheResult

		liveData = self.fetchWikipediaNamespaces(language)

		cache.setData('{}-siteinfo'.format(language), liveData, 7200)#2 hours

		return liveData

	def fetchWikipediaNamespaces(self, language):
		allNamespaces = {'category':[],'template':[]}
		site = wikipedia(language)
		for r in site.query(meta='siteinfo', siprop='namespaces|namespacealiases'):
			namespaces = r.namespaces
			catNSData = namespaces[catNS]
			allNamespaces['category'].extend([
				catNSData['name'],
				catNSData['canonical']
			])

			tplNSData = namespaces[tplNS]
			allNamespaces['template'].extend([
				tplNSData['name'],
				tplNSData['canonical']
			])

			namespaceAliasses = r.namespacealiases if 'namespacealiases' in r else []
			#print(namespaceAliasses)
			for alias in namespaceAliasses:
				nsID = str(alias['id'])
				if nsID == tplNS:
					allNamespaces['template'].append(tplNSData.get('alias'))
				if nsID == catNS:
					allNamespaces['category'].append(tplNSData.get('alias'))

		return allNamespaces

	def getWikipediaLanguages(self):
		cache = cache_handler.CacheHandler()
		cacheResult = cache.get('wiki-languages')

		if cacheResult:
			return cacheResult

		liveData = self.fetchWikipediaLanguages()

		cache.setData('wiki-languages', liveData, 7200)#2 hours

		return liveData

	def fetchWikipediaLanguages(self):
		allLanguages = []
		site = wikipedia('en')

		apiRes = site('sitematrix', smtype='language', smstate='all', smlangprop='code|name|site|dir|localname', smsiteprop='dbname|code|sitename|url|lang', smlimit='max')['sitematrix']

		#print(apiRes)

		for ind in apiRes:
			if ind == 'count':
				continue
			#{'code': 'zu', 'name': 'isiZulu', 'site': [{'url': 'https://zu.wikipedia.org', 'dbname': 'zuwiki', 'code': 'wiki', 'lang': 'zu', 'sitename': 'Wikipedia'}, {'url': 'https://zu.wiktionary.org', 'dbname': 'zuwiktionary', 'code': 'wiktionary', 'lang': 'zu', 'sitename': 'Wiktionary'}, {'url': 'https://zu.wikibooks.org', 'dbname': 'zuwikibooks', 'code': 'wikibooks', 'lang': 'zu', 'sitename': 'Wikibooks', 'closed': True}], 'dir': 'ltr', 'localname': 'zulu'}
			data = apiRes[ind]
			#print(ind)
			languageCode = data['code']
			foundWiki = False

			for site in data['site']:
				if 'closed' in site and site['closed'] == True:
					continue

				if site['code'] == 'wiki':
					allLanguages.append(languageCode)
					break

		return allLanguages
		#return allNamespaces

#

if __name__ == '__main__':
	inst = WikiAPI()
	res = inst.getWikipediaLanguages()
	print(res)
