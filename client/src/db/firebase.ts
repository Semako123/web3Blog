import "server-only"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcH_G_qFtVhxCLWXM04hr87-AcaLvs8KI",
  authDomain: "web3blog-dd90d.firebaseapp.com",
  projectId: "web3blog-dd90d",
  storageBucket: "web3blog-dd90d.firebasestorage.app",
  messagingSenderId: "993217149229",
  appId: "1:993217149229:web:1a5db5be928c74a9f3fba4",
  measurementId: "G-70W7N07ZC1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app)

export default db
