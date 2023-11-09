import firebase_admin
from firebase_admin import credentials, storage

class Connector:
    def __init__(self):
        cred = credentials.Certificate("db/space-data-analysis-fd9d81db79de.json")
        firebase_admin.initialize_app(cred,{'storageBucket': 'space-data-analysis.appspot.com'})

    def download(self, filename):
        # Establish path where data is stored on firebase
        file_path = "fits/" + filename
        
        # Download file needed
        bucket = storage.bucket() 
        blob = bucket.blob(file_path)
        blob.download_to_filename(f"api/{filename}")