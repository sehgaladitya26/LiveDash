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
    getDocs,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    where,
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

// Get collection reference
const collRef = collection(db, 'Queue_Vanish');

// Get user uid
const uid = sessionStorage.getItem('uid');

// var time;
const q1 = await getDocs(query(collRef, where("uid", "==", uid)));

if(q1.docs.length == 0) {
    const q = query(collRef);
    onSnapshot(q, (Snap) => {
        document.getElementById('que_pos').innerHTML = " " + Snap.docs.length; 
    })
} else {
    const data = q1.docs[0].data();
    const time = data["Time to Join"];
    
    const q2 = query(collRef, where("Time to Join", "<=", time));

    onSnapshot(q2, (Snap) => {
        document.getElementById('que_pos').innerHTML = " " + Snap.docs.length; 
    })
}


document.addEventListener('DOMContentLoaded', () => {
    console.log("FUCK THE HELL OFF")
    (async () => {
        const q = await getDocs(query(collRef, where("uid", "==", uid)));

        const ttj = new Date().getTime();

        sessionStorage.setItem("ttj", ttj);

        if (q.docs.length == 0) {
            setDoc(doc(collRef, uid), {
                uid: uid,
                "Time to Join": ttj
            }).then(async () => {
                const q = await getDocs(query(collRef, where("Time to Join", "<=", ttj)));

                document.getElementById('que_pos').innerHTML = " " + q.docs.length;
            })
        }
    })()
})