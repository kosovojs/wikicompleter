from flask import Flask
from flask import jsonify
from flask import render_template
from flask_cors import CORS, cross_origin
import request_handler
from flask import request

app = Flask(__name__, static_folder="./client/dist", template_folder="./client")

CORS(app)
app.debug = True

@app.route('/', methods=['GET'])
def index_page():
	return render_template('index.html')

@app.route('/data', methods = ['POST'])
def getData():
	reqHandler = request_handler.RequestHandler()
	#print(request.json)
	data = request.json

	result = reqHandler.main(data['info'])
	
	return jsonify(result)

@app.route('/req_data/<id>', methods = ['GET'])
def getReqData(id):
	import tool_db

	inst = tool_db.ToolDB()
	result = inst.getRequestData(id)

	if result:
		return jsonify(result)
	
	return jsonify({'error':True})

@app.after_request
def after_request(response):
	response.headers.add('Access-Control-Allow-Origin', '*')
	response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
	response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
	return response

if __name__ == '__main__':
	app.run()