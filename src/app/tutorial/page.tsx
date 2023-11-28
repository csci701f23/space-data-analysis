import React from 'react'
import Link from 'next/link'
import styles from "./styles.module.css"

export default function Page() {
  return (
    <main className={styles.main}>
        <Link href={"/"}>Back to home</Link>
        <div className='m-5'>
          <h1 className='text-2xl'>Welcome to the Mittelman Observtory Image Calibration Site!</h1>
          <h1 className='text-lg'>Here you will find all the steps necessary to calibrate your science images.</h1>
          <div>
           <p className='text-sm'> First, make sure that you have all the required raw images and combined files. <br /> In order to calibrate your image you will need <br />
            Raw Files: </p>
              <ul> 
                <li className='text-sm'> Raw science image in the <span style={{color:"red"}}>RED </span> filter </li>
                <li className='text-sm'> Raw science image in the <span style={{color:"green"}}> GREEN </span> filter </li>
                <li className='text-sm'> Raw science image in the <span style={{color:"blue"}}> BLUE </span> filter </li>
              </ul>
          </div>
        </div>
    </main>
  )
}
