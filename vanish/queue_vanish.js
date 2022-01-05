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
    getDoc,
    getDocs,
    addDoc,
    deleteDoc,
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

// const q0 = await getDocs(query(collRef));

// document.getElementById('que_pos').innerHTML = " " + q0.docs.length;

// Get user uid
const uid = sessionStorage.getItem('uid');

const q = await getDocs(query(collRef, where("uid", "==", uid)));

if (q.docs.length == 0) {
    setDoc(doc(collRef, uid), {
        uid: uid,
        "Time to Join": serverTimestamp()
    }).then(() => {
        const docRef = doc(collRef, uid);

        getDoc(docRef)
            .then((doc) => {
                const data = doc.data();
                const time = data["Time to Join"];

                (async () => {
                    const q1 = await getDocs(query(collRef, where("Time to Join", "<=", time)));

                    document.getElementById('que_pos').innerHTML = " " + q1.docs.length;
                })()
            })
    })
} else if (q.docs.length == 1) {
    const data = q.docs[0].data();
    const time = data["Time to Join"];

    (async () => {
        const q1 = await getDocs(query(collRef, where("Time to Join", "<=", time)));

        document.getElementById('que_pos').innerHTML = " " + q1.docs.length;
    })()
}

onSnapshot(collRef, (Snap) => {
    const docRef = doc(collRef, uid);

    getDoc(docRef)
        .then((doc) => {
            const data = doc.data();
            const time = data["Time to Join"];

            (async () => {
                const q2 = await getDocs(query(collRef, where("Time to Join", "<=", time)));
                if (q2.docs.length != 0) {
                    document.getElementById('que_pos').innerHTML = " " + q2.docs.length;
                }
            })()
        })
})

var Free_or_not = setInterval(myTimer, 2000);
function myTimer() {
    //document.querySelector('form').onsubmit = function () {
    fetch('https://blynk.cloud/external/api/get?token=R77dMWPsQ8B7xavEV_HVjaVF01DklJji&v3')
        .then(response => response.json())
        .then(data => {
            const myJSON = JSON.stringify(data)
            console.log(document.getElementById('que_pos').innerHTML == 1)
            if (myJSON == "0" && Number(document.getElementById('que_pos').innerHTML == 1)) {
                deleteDoc(doc(db, "Queue_Vanish", uid))
                    .then(() => {
                        location.href = 'vanish.html';
                        fetch("https://blynk.cloud/external/api/update?token=R77dMWPsQ8B7xavEV_HVjaVF01DklJji&v3=1")
                    });
                clearInterval(Free_or_not);
            }
        })
}

if(typeof sessionStorage.getItem('uid')  === 'object'){
    location.href = '../sign_in/sign_in.html'
  }

const Leave_Queue = document.querySelector('#Leave_Queue');
Leave_Queue.addEventListener('click', (e) => {
    e.preventDefault();

    deleteDoc(doc(db, "Queue_Vanish", uid))
        .then(() => {
            location.replace("../home_page/home.html");
        })
        .catch((err) => {
            console.log(err)
        })
})







