import React from 'react'
import Link from 'next/link'
import styles from "./styles.module.css"

export default function Page() {
  return (
    <main className={styles.main}>
        <Link href={"/"}>Back to home</Link>
    </main>
  )
}
