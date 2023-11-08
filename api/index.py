from flask import Flask
import firebase_admin
from firebase_admin import credentials, storage
from google.oauth2 import service_account
from calibration.imageinfo import read_image

app = Flask(__name__)

@app.route('/hello', methods=['GET'])
def hello_world():
    print("Received request at /api/hello")
    return "HELLO"


@app.route('/firebase/<filename>', methods=['GET'])
def FirebaseConnection(filename):

    cred = credentials.Certificate("db/space-data-analysis-fd9d81db79de.json")
    firebase_admin.initialize_app(cred,{'storageBucket': 'space-data-analysis.appspot.com'})

    file_path = "images/" + filename
    
    
    bucket = storage.bucket() 
    blob = bucket.blob(file_path)
    blob.download_to_filename("api/temp.fit")

    message = read_image("api/temp.fit")
    if message=="Image read":
        return "Success so far"
    
    # NEED TO DELETE TEMP WHEN DONE WITH IT

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5328)
