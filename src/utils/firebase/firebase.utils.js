import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRuhTpXTXbiknt4QZ7X4SGmDoUlipVlFM",
  authDomain: "crwn-clothing-db-7702f.firebaseapp.com",
  projectId: "crwn-clothing-db-7702f",
  storageBucket: "crwn-clothing-db-7702f.appspot.com",
  messagingSenderId: "162291202385",
  appId: "1:162291202385:web:29876a2f7348b98b7e3b70",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
