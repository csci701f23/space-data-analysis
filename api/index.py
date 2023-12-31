from flask import Flask, jsonify
from utils.firebase_utils import Connector
from calibration.imageinfo import read_image
from utils.serialize import Serializer
import os
import shutil
from calibration.createRGB import create_rgb
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

@app.route('/ping', methods=['GET'])
def ping():
    
    response = "pong"
        
    # Serializer Class
    serializer = Serializer()
    response = serializer.ping_output(response)
    return response


@app.route('/firebase/<filename>', methods=['GET'])
def FirebaseConnection(filename):

    # Download file
    connector = Connector()
    connector.download(filename)

    # Perform necessary operations with data
    imageInfo = read_image(f"api/{filename}")
    os.remove(f"api/{filename}")
    #print(jsonify(imageInfo))
    return jsonify(imageInfo)


@app.route('/combine/<uniqueID>', methods=['GET'])
def CombineImages(uniqueID):
    """
    Steps:

    1. Get all images we need
    2. Save to a directory
    3. CreateRGB and pass in those routes
    4. Upload to firebase
    5. All set, 200 message
    6. Front end displays
    """

    # Define where the firebase images will go
    raw_path = f"api/temp/{uniqueID}/raw/"
    combined_path = f"api/temp/{uniqueID}/combined/"

    # Make the directories
    os.makedirs(raw_path)
    os.makedirs(combined_path)

    # Download all files into correct directory
    connector = Connector()
    connector.download_folder(f"calibrate/{uniqueID}/raw_science", raw_path)
    connector.download_folder(f"calibrate/{uniqueID}/combined", combined_path)

    # Calibrate Imag

    output_path = f"public/{uniqueID}.png"
    src_path = f"/{uniqueID}.png"
    create_rgb(raw_path, combined_path, output_path)
    shutil.rmtree(f"api/temp/{uniqueID}")
    return jsonify(src_path)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5328)
