from flask import Flask, jsonify
from utils.firebase_utils import Connector
from calibration.imageinfo import read_image
from utils.serialize import Serializer
import os

app = Flask(__name__)

@app.route('/ping', methods=['GET'])
def ping():
    response_dict = {"Ping": "Pong"}
    
    # Serializer Class
    serializer = Serializer()
    response = serializer.ping_output(response_dict)
    return response


@app.route('/firebase/<filename>', methods=['GET'])
def FirebaseConnection(filename):

    # Download file
    connector = Connector()
    connector.download(filename)

    # Perform necessary operations with data
    #message = read_image(f"api/{filename}")

    # SERIALIZE DATA
    #if message=="Image read":
    return jsonify("Working")
    
    # Delete temp file after done with it
   # os.remove(f"api/{filename}")

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5328)
