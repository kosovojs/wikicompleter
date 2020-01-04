import pymysql
import os
import json
import hashlib
import yaml

import cache_handler
import tool_db
import wiki_db
from time import time, sleep

config = yaml.safe_load(open('config.yaml'))

print(config)

#vēl vajadzētu rate limiter

class RequestHandler:
	cache = None

	def generateHashForInputData(self, data):
		#https://stackoverflow.com/questions/5884066/hashing-a-dictionary
		dataForHash = data

		if 'ignoreCache' in dataForHash:
			del dataForHash['ignoreCache']

		requestInputString = json.dumps(data, sort_keys=True)
		reqHash = hashlib.md5(requestInputString.encode())
		return reqHash.hexdigest()
	
	def main(self, inputParams):
		startTime = time()
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
			resultFromDB = db_inst.main(inputParams)
			isCached = False
			debugLine = True
			self.cache.setData(reqHash, resultFromDB)
			
			requestData = resultFromDB

		elif cacheResult:
			requestData = cacheResult
			isCached = True
			cacheAge = self.cache.ttl(reqHash)

		else:
			db_inst = wiki_db.WikiDB(inputParams['from'],inputParams['to'])
			resultFromDB = db_inst.main(inputParams)
			isCached = False
			debugLine = True
			self.cache.setData(reqHash, resultFromDB)
			
			requestData = resultFromDB
		
		if not reqID:
			reqID = toolDB.saveRequestData(inputParams['from'],inputParams['to'],inputParams, reqHash)
		
		endTime = time()
		reqTime = endTime - startTime
		
		sleep(0.3)

		return {
			'data': requestData,
			'success': True,
			'meta': {
				'debugLine': debugLine,
				'time': "{0:.2f}".format(reqTime),
				'id': reqID,
				'cached': isCached,
				'cache_age': None if not isCached else (self.cache.expireTime - cacheAge)
			}
		}
		
		#return self.fromCategory
#
if __name__ == '__main__':
	inst = RequestHandler()
	res = inst.main({ 'from':'en','to':'lv', 'ignoreCache': False, 'filters': [
	{ 'type': 'category', 'specific': { 'title': '1957 births', 'depth': 5, 'talk': False } },
	{ 'type': 'template', 'specific': { 'talk': False, 'title': 'Infobox park' } },
	{ 'type': 'petscan', 'specific': { 'id': '' } }
	] })

	print(res)