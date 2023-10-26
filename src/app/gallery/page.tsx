"use client"

import React, { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';


export default function Gallery() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [images, setImages] = useState<any[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // Get the first selected file
    setSelectedFile(file || null);
  };

  const handleUpload = async() => {

    if (selectedFile) {

      //const formData = new FormData();
      //formData.append('file', selectedFile);

      const res = await fetch('http://localhost:3000/api/upload',
      {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          "file": selectedFile,
        })
      })

      const data = await res.json()
      console.log(data)

    }
    
  };


  // GET REQUEST
  const fetchImageList = async () => {
    const res = await fetch('http://localhost:3000/api/upload',
    {
      method: 'GET',
      headers: {
        'Content-Type':'application/json'
      },
    })

    if (res.ok) {
      const data = await res.json();
      const documents = data['Found documents =>']
      setImages(documents);
    }

  }

//NEW
useEffect(() => {
    fetchImageList();
  }, []);

  return (
    <div>
      <input type="file" accept="image/gif, image/jpeg, image/png" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {images.map((image, index) => {
        return <Image key={index} src={image} width={200} height={300} alt='image'/>
      })}

    </div>
  );
}






