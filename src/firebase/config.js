import { initializeApp } from 'firebase/app'
import { getFirestore, Timestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDUgHdfEz261qXs5kltxGrEsbKxK3eHhQM",
    authDomain: "mymoney-5fcdb.firebaseapp.com",
    projectId: "mymoney-5fcdb",
    storageBucket: "mymoney-5fcdb.appspot.com",
    messagingSenderId: "792924763243",
    appId: "1:792924763243:web:cc718c994e5d23b8412d2e",
    measurementId: "G-FFE73PZWWD"
  };


  const app = initializeApp(firebaseConfig)

  const db = getFirestore(app)
  const auth = getAuth(app)

  const timestamp = new Timestamp()



  export { db, auth, timestamp }