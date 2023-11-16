import firebase_admin
from firebase_admin import credentials, storage
from google.cloud.storage import Client, transfer_manager

class Connector:
    def __init__(self):

        self.cred = credentials.Certificate("api/utils/serviceAccountKey.json")
        firebase_admin.initialize_app(self.cred,{'storageBucket': 'space-data-analysis.appspot.com'})

    def download(self, filename):
        # Establish path where data is stored on firebase
        file_path = "fits/" + filename
        
        # Download file needed
        bucket = storage.bucket() 
        blob = bucket.blob(file_path)
        blob.download_to_filename(f"api/{filename}")

    def download_folder(self, firebase_folder_path, local_dir_path):
        bucket = storage.bucket()
        blob_list = bucket.list_blobs(prefix=firebase_folder_path)

        # Iterate through the list of blobs (files)
        for blob in blob_list:
            # Download the image to a local file
            destination_file_name = f"{local_dir_path}/{blob.name.split('/')[-1]}"
            blob.download_to_filename(destination_file_name)
            print(f"Downloaded {blob.name} to {destination_file_name}")