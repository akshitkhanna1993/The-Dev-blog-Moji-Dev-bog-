

import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIz****************Q",
    authDomain: "the-m*********om",
    projectId: "th*****a67",
    storageBucket: "th*******ot.com",
    messagingSenderId: "*****",
    appId: "1:1************26718"
  };


  //init firebase

  firebase.initializeApp(firebaseConfig)

  // init firestore service 

  const projectFirestore = firebase.firestore()
  const timestamp  = firebase.firestore.FieldValue.serverTimestamp

  export {projectFirestore,timestamp}