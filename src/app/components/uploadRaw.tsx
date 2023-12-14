import React, { useState, ChangeEvent, useEffect } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../db/firebase";

type UploadRawProps = {
  imageType: String;
  tailwindColor: String;
  onNext: () => void;
  uniqueID: any;
  imageFolder: String;
};

const UploadRaw: React.FC<UploadRawProps> = ({
  imageType,
  tailwindColor,
  onNext,
  uniqueID,
  imageFolder,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);

  // Initialize Firebase
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // Get the first selected file
    setSelectedFile(file || null);
  };

  const handleUpload = () => {
    // First check if there is a selected file, otherwise give error
    if (selectedFile) {
      setLoadingMessage(true);
      //Extract the file name
      const fileName = selectedFile.name;

      //Make the upload path for the file
      // The file will go to the meta folder "calibrate"
      // and then go to the uniqueID, be given the correct classifier
      // for the type of image and finally be given the filename
      const imageRef = ref(
        storage,
        `calibrate/${uniqueID}/${imageFolder}/${fileName}`
      );

      uploadBytes(imageRef, selectedFile)
        .then(() => {
          alert("Image Uploaded");
        })
        .then(() => {
          setLoadingMessage(false);
          onNext();
        })
        .catch((err) => console.error(err));
    } else {
      setUploadError(true);
    }
  };

  useEffect(() => {
    setUploadError(false);
  }, [selectedFile]);

  return (
    <div className="m-5">
      {imageFolder === "raw_science" && (
        <h1 className="text-2xl">
          Select your raw science image in the{" "}
          <span className={`${tailwindColor}`}>{imageType}</span>.
        </h1>
      )}
      {imageFolder === "combined" && (
        <h1 className="text-2xl">
          Select your combined{" "}
          <span className={`${tailwindColor}`}>{imageType}</span> image.
        </h1>
      )}
      <div className="relative rounded-md shadow-sm m-5">
        <input
          type="file"
          onChange={handleFileChange}
          className="sr-only"
          id="fileInput"
        />

        <label
          htmlFor="fileInput"
          className="cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded-md border border-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700 active:bg-indigo-700"
        >
          Choose a File
        </label>
      </div>

      <div className="m-5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>

      {uploadError && (
        <div className="text-red-500 font-bold">
          ERROR: PLEASE SELECT AN IMAGE
        </div>
      )}

      {selectedFile && (
        <div className="m-5">
          <p>Selected File: {selectedFile.name}</p>
        </div>
      )}
      {loadingMessage && (
        <div>
          <div className="text-black mb-4">Uploading your image...</div>
          <div className="relative">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
export default UploadRaw;
