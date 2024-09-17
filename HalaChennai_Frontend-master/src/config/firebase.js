// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// add all this is in env folder 
const firebaseConfig = {
  apiKey: "AIzaSyBHG1CKRC2zJxzsXNAaSnvS3WcG40x7bxA",
  authDomain: "halachennai-ecd86.firebaseapp.com",
  databaseURL: "https://halachennai-ecd86-default-rtdb.firebaseio.com",
  projectId: "halachennai-ecd86",
  storageBucket: "halachennai-ecd86.appspot.com",
  messagingSenderId: "395426646768",
  appId: "1:395426646768:web:722303f51abcb99c6c5035"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

// Export the Firebase services and functions you need
const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export { auth, db, provider, onAuthStateChanged, signInWithGooglePopup, signOut, doc, setDoc, getDoc };