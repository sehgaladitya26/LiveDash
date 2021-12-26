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

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const name = signupForm['signup-name'].value;
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // console.log(email, password);

    // sign up the user
    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    // Email verification sent!
                    const collRef = collection(db, 'Users');

                    setDoc(doc(collRef, cred.user.uid), {
                        Name: name,
                        Email: email,
                        'User created': serverTimestamp(),
                        'Last login': serverTimestamp(),
                        'Email Verified': 'False'
                    }).then(() => {
                        location.href = "../sign_in/sign_in.html";
                    })
                });
        })
        .catch((err) => {
            console.log(err.message)
        })
});
