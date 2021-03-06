import pymysql
import os
import json
from config import IS_DEV

class ToolDB:
	conn = None
	
	def __init__(self):
		self.connect()
	
	def encode_if_necessary(self, b):
		if type(b) is bytes:
			return b.decode('utf8')
		return b

	def connect(self):
		try:
			if IS_DEV:
				self.conn = pymysql.connect(host='127.0.0.1', user='root_type', password='parole', port=3307, db='missing', charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
			else:
				self.conn = pymysql.connect(db='s54270__completer_p', read_default_file=os.path.expanduser("~/replica.my.cnf"), host='tools.db.svc.eqiad.wmflabs', port=3306, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)

		except pymysql.Error as e:
			print('e:', e)
			exit()
	
	def runQuery(self, sql: str, params: tuple = (), maxTries: int = 2) -> dict:
		with self.conn.cursor() as cursor:
			cursor.execute(sql, params)
			result = cursor.fetchall()
			return result
		
	def getRequestID(self, hash: str):
		sqlTemplate = "SELECT id from requests where request_hash=%s"
		result = self.runQuery(sqlTemplate, (hash))

		if len(result) == 0:
			return None
		
		reqID = result[0]['id']

		return reqID

	def getCurrentTime(self):
		from time import gmtime, strftime
		currTime = strftime("%Y-%m-%d %H:%M:%S", gmtime())#'2009-01-05 22:14:39'
		return currTime

	def saveRequestData(self, langFrom: str, langTo: str, reqData, reqHash: str):
		sqlTemplate = "insert into requests (from_lang, to_lang, request_data, request_hash, time_added) values (%s, %s, %s, %s, %s)"
		
		with self.conn.cursor() as cursor:
			reqData = json.dumps(reqData, sort_keys=True)
			time = self.getCurrentTime()
			cursor.execute(sqlTemplate, (langFrom,langTo,reqData,reqHash,time))
			self.conn.commit()

			id = self.runQuery('SELECT LAST_INSERT_ID() as id')[0]['id']
			
			return id

	def getRequestData(self, id: str):
		sqlTemplate = "SELECT request_data from requests where id=%s"
		result = self.runQuery(sqlTemplate, (id))

		if len(result) == 0:
			return None
		
		data = json.loads(result[0]['request_data'])

		return data
#
if __name__ == '__main__':
	inst = ToolDB()
	inst.getRequestID('dfdshfdsd')