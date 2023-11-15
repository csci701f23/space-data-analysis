"use client"
import React, { useState, ChangeEvent, useEffect } from 'react';
import {ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import {storage} from '../../../db/firebase'

export default function Calibrate() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileInformation, setFileInfo] = useState<any | null>("")
  
  // Initialize Firebase
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // Get the first selected file
    setSelectedFile(file || null);
  };

  const handleUpload = () => {

    if (selectedFile) {
      
      const fileName = selectedFile.name + v4()
      const imageRef = ref(storage, `fits/${fileName}`)

      uploadBytes(imageRef, selectedFile)
      .then(() => {
        alert("Image Uploaded")
        return fetch(`api/firebase/${fileName}`)
      })
      .then(response => response.json())
      .then(data => setFileInfo(data))
      .catch(err => console.error(err));

    }
  };

  return (
    <div className='m-5'>
      <h1 className='text-2xl'>Select a FITS file to begin calibration</h1>
      <div className="relative rounded-md shadow-sm m-5">
        <input type="file" onChange={handleFileChange} className="sr-only" id="fileInput" />

        <label htmlFor="fileInput" className="cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded-md border border-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700 active:bg-indigo-700">
          Choose a File
        </label>
      </div>
      
      <div className='m-5'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleUpload}>Upload</button>
      </div>

      <div className='m-5'>
        <p>Image Exposure: {fileInformation.exposure}</p>
        <p>Image Type: {fileInformation.imageType}</p>
        <p>Image Temp: {fileInformation.temp}</p>
      </div>

    </div>


  );
}