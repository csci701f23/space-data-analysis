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
    imageInfo = read_image(f"api/{filename}")
    os.remove(f"api/{filename}")
    return jsonify(imageInfo)


@app.route('/combine/<v4>', methods=['GET'])
def CombineImages(v4):
    """
    Steps:

    1. Get all images we need
    2. Save to a directory
    3. CreateRGB and pass in those routes
    4. Upload to firebase
    5. All set, 200 message
    6. Front end displays
    

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5328)
