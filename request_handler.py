import pymysql
import os
import json
import hashlib
import yaml

import cache_handler
import wiki_db

config = yaml.safe_load(open('config.yaml'))

print(config)

#vēl vajadzētu rate limiter

class RequestHandler:
	cache = None

	def generateHashForInputData(self, data):
		#https://stackoverflow.com/questions/5884066/hashing-a-dictionary
		requestInputString = json.dumps(data, sort_keys=True)
		reqHash = hashlib.md5(requestInputString.encode())
		return reqHash.hexdigest()
	
	def main(self, inputParams):
		reqHash = self.generateHashForInputData(inputParams)
		##šeit vēl jāpārbauda, vai nav saglabāts DB

		self.cache = cache_handler.CacheHandler()

		cacheResult = self.cache.get(reqHash)
		
		requestData = None
		isCached = False
		shouldRespectCache = not inputParams['ignoreCache'] if 'ignoreCache' in inputParams else True
		if cacheResult and shouldRespectCache:
			requestData = cacheResult
			isCached = True
			cacheAge = self.cache.ttl(reqHash)

		else:
			db_inst = wiki_db.WikiDB('en','lv')
			resultFromDB = db_inst.main(inputParams)
			self.cache.setData(reqHash, resultFromDB)
			
			requestData = resultFromDB
		
		return {
			'data': requestData,
			'success': True,
			'meta': {
				'cached': isCached,
				'cache_age': None if not isCached else cacheAge
			}
		}
		
		#return self.fromCategory
#
#inst = WikiDB('en','lv')
#inst.main()
inst = RequestHandler()
print(inst.main({ 'from':'en','to':'lv', 'ignoreCache': False, 'filters': [
	{ 'type': 'category', 'specific': { 'title': '1957 births', 'depth': 5, 'talk': False } },
	{ 'type': 'template', 'specific': { 'title': 'Infobox park', 'talk': False } },
	{ 'type': 'petscan', 'specific': { 'id': '' } }
] }))