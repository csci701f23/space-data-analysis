"use client"
import React, { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import {ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import {storage} from '../../../db/firebase'

export default function Gallery() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageList, setImageList] = useState<Array<any>>([]);
  
  // Initialize Firebase
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // Get the first selected file
    setSelectedFile(file || null);
  };

  const handleUpload = () => {

    if (selectedFile) {

      const imageRef = ref(storage, `fits/${selectedFile.name + v4()}`)

      uploadBytes(imageRef, selectedFile).then(() => {
        alert("Image Uploaded")
      })


    }
  };

const imageListRef = ref(storage, 'images/')
//NEW
useEffect(() => {
  setImageList([]) // Make sure to zero it out
  listAll(imageListRef).then((response) => {
    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        setImageList((prev) => [...prev, url])
      })
    })
  })
    
  }, []);

  // NEED TO STYLE THE GALLERY
  return (
    <div className='m-5'>
      <h1 className='text-2xl'>Welcome to the Gallery!</h1>
      <div className="relative rounded-md shadow-sm m-5">
        <input type="file" onChange={handleFileChange} className="sr-only" id="fileInput" />

        <label htmlFor="fileInput" className="cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded-md border border-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700 active:bg-indigo-700">
          Choose a File
        </label>
      </div>
      
      <div className='m-5'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleUpload}>Upload</button>
      </div>
      
      <div className= "grid grid-cols-3 gap-4 items-center justify-center m-30">
      {imageList.map((url, index) => {
        return <Image src={url} key={index} alt='Images' width={300} height={200}/>
      })}
      </div>

    </div>


  );
}