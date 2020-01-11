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
					allNamespaces['template'].append(tplNSData['alias'])
				if nsID == catNS:
					allNamespaces['category'].append(tplNSData['alias'])

		return allNamespaces
#

if __name__ == '__main__':
	inst = WikiAPI()
	res = inst.getWikipediaNamespaces('lv')
	print(res)