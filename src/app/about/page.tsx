import React from 'react'
import Link from 'next/link'
import styles from "./styles.module.css"
import Image from "next/image"
import observatory from "./observatory.jpg"

export default function Page() {
  return (
    <main className={styles.main}>
        <Link href={"/"}>Back to home</Link>
    <div  className='m-5 p-4 text-justify text-gray-300'>
      <div className='text-xl bg-[#1825CA]/70 text-gray font-bold text-justify'> About </div>
      <br />
      <p className='text-md'> Mittleman Observatory at Middlebury College is the “largest and best equipped” institution observatory in the state of Vermont. The aim of this project is to make the Middlebury telescope more accessible to Middlebury students. Many students do not know how to utilize the resources that the telescope provides, and there is currently no streamlined way to process telescope images. 
      <br />
      <br />
      Once a telescope image is taken, the science image calibration requires three additional types of raw data files: bias images, dark images, and flat images. These images are used to reduce noise, and find the contamination on the telescope in order to increase the accuracy of the science image. 
      <br />
      Generally, bias and dark frames can be stable for several months, so long as the temperature and exposure times match the science image, but flat images need to be taken of the twilight sky the same night as the science image.
      <br />
      The image calibration process begins with the combination of raw files into combined files through a series of combination and subtraction steps. The combined files are used to calibrate the science images, before they are aligned and combined. The combined science images are still grayscale images. To create a color image, the three combined science images must be combined into a single RGB image.
      <br /> 
      This web app is designed to help students with this calibration process, by providing a simple, straightforward platform where the science images and raw data can be uploaded, and using the AstroPy package, the final image is generated and displayed. 
      <br />
      <br />
      We hope that future classes of Middlebury students will be able to use this resource to facilitate image capture at the Mittelman Observatory. 
      </p>
    </div>
    <div className='flex items-center justify-center'> 
    <Image
     src={observatory}
     alt='observatoryImage' 
     width={400}
     height={300}
     className='rounded-lg shadow-lg' 
     />
    </div>
    </main>
  )
}
