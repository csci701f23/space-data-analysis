import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBV1-EUxKEAnDyHLUo1tTXKVyf4G-FFSd0",
    authDomain: "space-data-analysis.firebaseapp.com",
    projectId: "space-data-analysis",
    storageBucket: "space-data-analysis.appspot.com",
    messagingSenderId: "621075009395",
    appId: "1:621075009395:web:936d2d56adca23a2d67f06",
    measurementId: "G-XSSHGVXB13"
  };

  const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app)