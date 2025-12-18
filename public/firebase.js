// // firebase.js
// // ES Module style - used by other JS files via type="module"
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-app.js";
// import {
//   getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged
// } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-auth.js";
// import {
//   getFirestore, collection, addDoc, getDocs, query, where, orderBy, serverTimestamp
// } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-firestore.js";
// import {
//   getStorage, ref as sref, uploadBytes, getDownloadURL
// } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-storage.js";

// // ---- PASTE YOUR FIREBASE CONFIG HERE ----
// // const firebaseConfig = {
// //   apiKey: "YOUR_API_KEY",
// //   authDomain: "PROJECT.firebaseapp.com",
// //   projectId: "PROJECT",
// //   storageBucket: "PROJECT.appspot.com",
// //   messagingSenderId: "SENDER_ID",
// //   appId: "APP_ID"
// // };
// // ----------------------------------------

// const firebaseConfig = {
//   apiKey: "AIzaSyBHqbuwOBlJBix9SgLFqYSLqFlXs7Uqup8",
//   authDomain: "lost-and-found-17d0e.firebaseapp.com",
//   projectId: "lost-and-found-17d0e",
//   storageBucket: "lost-and-found-17d0e.firebasestorage.app",
//   messagingSenderId: "746918449748",
//   appId: "1:746918449748:web:6de9b7b1a1a68ae91f13c1"
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// const db = getFirestore(app);
// const storage = getStorage(app);

// export { auth, provider, signInWithPopup, signOut, onAuthStateChanged, db, collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, sref, uploadBytes, getDownloadURL };



// Code given by Gemini




// firebase.js
// We use the full URL (CDN) so the browser can load these from the internet.
// Do not change these URLs to local paths like './firebase-app.js'.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-firestore.js";
import { getStorage, ref as sref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-storage.js";

// Your actual configuration (Taken from your app.js file)
const firebaseConfig = {
  apiKey: "AIzaSyBHqbuwOBlJBix9SgLFqYSLqFlXs7Uqup8",
  authDomain: "lost-and-found-17d0e.firebaseapp.com",
  projectId: "lost-and-found-17d0e",
  storageBucket: "lost-and-found-17d0e.firebasestorage.app",
  messagingSenderId: "746918449748",
  appId: "1:746918449748:web:6de9b7b1a1a68ae91f13c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

// Export everything so other files (like view_items.js) can use them
export { auth, provider, signInWithPopup, signOut, onAuthStateChanged, db, collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, sref, uploadBytes, getDownloadURL, storage };