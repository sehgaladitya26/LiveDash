// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import {
    getFirestore,
    collection,
    doc,
    setDoc,
    addDoc,
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

// Get credentials
// const cred = JSON.parse(sessionStorage.getItem("cred"));
// var i;
// for (i = 0; i < cred.length; i++) {
//     alert(cred[i]);
// }


// console.log(cred);

onAuthStateChanged(auth, (user) => {
    if (user) {

        console.log(auth.currentUser);
        const verify = document.querySelector('#verify_button');
        verify.addEventListener('click', (e) => {
            e.preventDefault();

            sendEmailVerification(auth.currentUser)
                .then(() => {
                    // Email verification sent

                    signOut(auth)
                        .then(() => {
                            console.log('user signed out');
                            location.replace("sign_in.html");
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })

        });
    }
});



