import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

export default function Home() {
  return (

    <div className={styles.container}>
    
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{
            zIndex: -1,
            position:"fixed",
            width: "100vw",
            height: "100vw"
        }}>
            <Image
            src="/space3.gif"
            alt="space image"
            layout="fill"
            />
            
        </div>

      <main>
        <h1 className={styles.title}>
          <u>Mittelman Observatory Image Calibration</u>
        </h1>

        <p className={styles.description}>
          A CSCI 701 project
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Get Started &rarr;</h3>
            <p>Take the necessary steps to calibrate your image.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Tutorial &rarr;</h3>
            <p>Learn how to calibrate your telescope image!</p>
          </a>

          <a
            href="/gallery"
            className={styles.card}
          >
            <h3>Gallery &rarr;</h3>
            <p>See past projects.</p>
          </a>

          <a
            href="/about"
            className={styles.card}
          >
            <h3>About &rarr;</h3>
            <p>
              Read about the underlying motivation for this project.
            </p>
          </a>
        </div>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}