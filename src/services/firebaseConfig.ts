import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore/bundle";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL:
    "https://painterly-b97af-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase
    .firestore()
    .enablePersistence()
    .catch((e) => {
      console.log(e.message);
    });
}

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const database = firebase.database();
export const provider = new firebase.auth.GoogleAuthProvider();
export const FieldValue = firebase.firestore.FieldValue;
export const timestamp = firebase.firestore.Timestamp.now();
export const serverTimestamp = firebase.firestore.Timestamp;
export type Timestamp = typeof timestamp;

provider.setCustomParameters({
  login_hint: "user@example.com",
});
