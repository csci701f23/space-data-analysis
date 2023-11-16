import React, { useState, ChangeEvent, useEffect } from "react";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../../db/firebase";

type UploadRawProps = {
  color: String;
  tailwindColor: String;
  onNext: () => void;
};

const UploadRaw: React.FC<UploadRawProps> = ({
  color,
  tailwindColor,
  onNext,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState(false);

  // Create new components for the pages

  // Initialize Firebase
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // Get the first selected file
    setSelectedFile(file || null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const fileName = selectedFile.name + v4();
      const imageRef = ref(storage, `fits/${fileName}`);

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
      <h1 className="text-2xl">
        Select your raw science image in the{" "}
        <span className={`${tailwindColor}`}>{color}</span> filter.
      </h1>
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
