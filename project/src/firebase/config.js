import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBSWKcX1ZJKz74FFlHNQj-qPXRJm4FTh6A",
  authDomain: "integrador-firebase-408ba.firebaseapp.com",
  projectId: "integrador-firebase-408ba",
  storageBucket: "integrador-firebase-408ba.firebasestorage.app",
  messagingSenderId: "988784490688",
  appId: "1:988784490688:web:485e12ffd9045d66e9d525"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()