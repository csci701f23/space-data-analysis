import React from 'react'
import Link from 'next/link'
import styles from "./styles.module.css"

export default function Page() {
  return (
    <main className={styles.main}>
        <Link href={"/"} className={styles.linkStyle}>Back to home</Link>
        <div className={styles.textStyle}>
          <h1 className='text-2xl'>Welcome to the Mittelman Observtory Image Calibration Site!</h1>
          <h1 className='text-lg'>Here you will find all the steps necessary to calibrate your science images.</h1>
          <div>
          <br />
           <p className='text-sm'> First, make sure that you have all the required raw images and combined files. <br /> In order to calibrate your image you will need <br /> <br /> </p>
           <p className='text-sm' style={{textDecorationLine:"underline"}}> Raw Files: </p>
              <ul> 
                <li className='text-sm'> Raw science image in the <span style={{color:"red"}}>RED </span> filter </li>
                <li className='text-sm'> Raw science image in the <span style={{color:"green"}}> GREEN </span> filter </li>
                <li className='text-sm'> Raw science image in the <span style={{color:"blue"}}> BLUE </span> filter </li>
              </ul>
              <br />
            <p className='text-sm' style={{textDecorationLine:"underline"}}> Combined Files: </p>
            <ul>
              <li className='text-sm'> Combined Bias file </li>
              <li className='text-sm'> Combined Dark file </li>
              <li className='text-sm'> Combined flat file in the <span style={{color:"red"}}> RED </span> filter </li>
              <li className='text-sm'> Combined flat file in the <span style={{color:"green"}}> GREEN </span> filter </li>
              <li className='text-sm'> Combined flat file in the <span style={{color:"blue"}}> BLUE </span> filter </li>
            </ul>
            <br />
            <p className='text-sm'> Once you have all of these files accessible, click the Get Started button on the home screen.
            <br /> This will instruct you to upload each image one by one. 
            <br /> Once all the images have been uploaded, you will see a ‘thank you’ message. This means that the script to calibrate the image is running. 
            <br /> Be patient, this may take a second. </p> 
          </div>
        </div>
    </main>
  )
}
