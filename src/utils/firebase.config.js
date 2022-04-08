import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDuvFgAfkWz6qbNuEL6cGdw8j-AuuQjasY",
    authDomain: "arch-6f3d2.firebaseapp.com",
    projectId: "arch-6f3d2",
    storageBucket: "arch-6f3d2.appspot.com",
    messagingSenderId: "313231071312",
    appId: "1:313231071312:web:54ffb4909a83853a385955",
    measurementId: "G-2FPYNDG173"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;