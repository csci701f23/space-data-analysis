import firebase_admin
from firebase_admin import credentials, storage
from google.cloud.storage import Client, transfer_manager
import firebase

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

    def download_folder(self, firebase_folder_path, local_dir_path):
        bucket = storage.bucket()
        blobs = list(bucket.list_blobs())

        for image in blobs:
            destination_file_path = f"{local_dir_path}/{image.name.split('/')[-1]}"  # Extract filename
            image.download_to_filename(destination_file_path)