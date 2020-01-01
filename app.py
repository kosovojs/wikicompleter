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
	data = request.form

	result = reqHandler.main(data['info'])
	
	return jsonify(result)

if __name__ == '__main__':
	app.run()