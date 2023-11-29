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

  // Initialize Firebase
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // Get the first selected file
    setSelectedFile(file || null);
  };

  const handleUpload = () => {
    // First check if there is a selected file, otherwise give error
    if (selectedFile) {
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
        .then(() => onNext())
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
    </div>
  );
};
export default UploadRaw;
