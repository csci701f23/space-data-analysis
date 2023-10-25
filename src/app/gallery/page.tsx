"use client"

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';



export default function Gallery() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // Get the first selected file
    setSelectedFile(file || null);
  };

  const handleUpload = async() => {

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await fetch('http://localhost:3000/api/upload',
      {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({formData})
      })

      const result = await res.json()
      console.log(result)
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}






