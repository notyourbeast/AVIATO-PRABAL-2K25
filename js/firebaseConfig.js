// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// TODO: Replace the following with your own Firebase project config 👇
const firebaseConfig = {
    apiKey: "AIzaSyBPFb8uxZ2mLyVmv2d8JFPcmyBChc9LjkE",
    authDomain: "women-empwr.firebaseapp.com",
    projectId: "women-empwr",
    appId: "1:230261281865:web:a5ad656bd1de125eafdb98"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
