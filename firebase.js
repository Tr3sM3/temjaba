// ======================================================
// TEM-JABÁ
// firebase.js v1.2
// Firebase
// ======================================================


import {
initializeApp
} from 
"https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";


import {
getFirestore
} from 
"https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";




const firebaseConfig = {


apiKey:
"AIzaSyALNh4MBPGfxTxYflvhGgtfaVKgFotrC4Y",


authDomain:
"tem-jaba.firebaseapp.com",


projectId:
"tem-jaba",


storageBucket:
"tem-jaba.firebasestorage.app",


messagingSenderId:
"566716674566",


appId:
"1:566716674566:web:c38b643380da8654788987"


};



const app =
initializeApp(firebaseConfig);




// Firestore

export const db =
getFirestore(app);