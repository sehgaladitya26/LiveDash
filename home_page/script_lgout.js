// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_MVJry1gDFJbd_sLw-WZk4cwwF0kDrKA",
    authDomain: "skarr-3a4a5.firebaseapp.com",
    projectId: "skarr-3a4a5",
    storageBucket: "skarr-3a4a5.appspot.com",
    messagingSenderId: "1040437409550",
    appId: "1:1040437409550:web:8187021b427c113ab1895f",
    measurementId: "G-DG6H3K2CTM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Authentication
const auth = getAuth();

// Initialize firestore
const db = getFirestore();

// // login
// const loginForm = document.querySelector('#login-form');
// loginForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     // get user info
//     const email = loginForm['login-email'].value;
//     const password = loginForm['login-password'].value;

//     signInWithEmailAndPassword(auth, email, password)
//         .then((cred) => {
//             console.log(cred.user)

//             //close the login modal and reset the form
//             location.href = "../home_page/home.html";
//             loginForm.reset();
//         })
//         .catch((err)=>{
//             console.log(err.message)
//         })
// });

// Get user uid
const uid = sessionStorage.getItem('uid');

// console.log(uid);

// Get document refernce
const docRef = doc(db, 'Users', uid);

getDoc(docRef)
    .then((doc) => {
        // console.log(doc.data(), doc.id);

        const data = doc.data();

        document.getElementById('User').innerHTML = data.Name;  

    })

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();

    signOut(auth)
        .then(() => {
            // console.log('user signed out');
            location.replace ("../index.html");
        })
        .catch((err) => {
            console.log(err)
        })
});
