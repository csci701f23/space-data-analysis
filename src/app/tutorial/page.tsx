import React from 'react'
import Link from 'next/link'
import styles from "./styles.module.css"

export default function Page() {
  return (
    <main className={styles.main}>
        <Link href={"/"}>Back to home</Link>
        <div className='m-5'>
          <h1 className='text-2xl'>Welcome to the Mittelman Observtory Image Calibration Site!</h1>
          <h1 className='text-xl'>Here you will find all the steps necessary to calibrate your science images.</h1>
        </div>
    </main>
  )
}
