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

      const imageRef = ref(storage, `images/${selectedFile.name + v4()}`)

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
    <div>
      <input type="file" accept="image/gif, image/jpeg, image/png" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imageList.map((url, index) => {
        return <Image src={url} key={index} alt='Images' width={300} height={200}/>
      })}
    </div>


  );
}