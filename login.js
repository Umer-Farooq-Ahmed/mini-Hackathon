
    // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore , setDoc , doc , getDoc , addDoc ,collection } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCzrC4vdgrzKIdoM_wdEml6_eMz8Su6Igw",
//     authDomain: "hackathon2-8dceb.firebaseapp.com",
//     projectId: "hackathon2-8dceb",
//     storageBucket: "hackathon2-8dceb.appspot.com",
//     messagingSenderId: "212323014228",
//     appId: "1:212323014228:web:5d4ec03bf0ce3eda367fc1"
// };
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

const loginBtn = document.querySelector("#loginBtn")
loginBtn.addEventListener("click" , login)
async function login(e) {
    // try {
         e.preventDefault();
        const email = document.getElementById("Email").value
        const password = document.getElementById("Password").value
        console.log(email , password)
        const userLogin = await signInWithEmailAndPassword(auth ,email ,password)
        console.log("userlogin" , userLogin)
        localStorage.setItem("userUid" , userLogin.user.uid)
        const userRef = doc(db , "users" , userLogin.user.uid)
        console.log("userRef" , userRef)
        const docSnap = await getDoc(userRef)
        console.log("docsnap" , docSnap)
        if (!docSnap.exists()) {
            console.log("Invaild user")
            alert("Invaild User")
            return
        }
        console.log("Document data : " , docSnap.data())
        const userData = docSnap.data()
        console.log("userdata" , userData)
        localStorage.setItem("user" , JSON.stringify(userData))
      window.location.replace("./dashboard.html")
        
    // } catch (error) {
    //     console.log("error. message" , error.message)
    //     alert("error ")
        
    // }
    
}