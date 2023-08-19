// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore , setDoc , doc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyCPGhV4qv9JT_srSz8JBrJauSoPQEsm_GQ",
  authDomain: "my-todo-65dc4.firebaseapp.com",
  projectId: "my-todo-65dc4",
  storageBucket: "my-todo-65dc4.appspot.com",
  messagingSenderId: "1021739358446",
  appId: "1:1021739358446:web:75aef1d0517923624afbff"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);