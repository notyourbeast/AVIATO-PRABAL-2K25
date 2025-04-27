// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Paste your own config here
const firebaseConfig = {
    apiKey: "AIzaSyBPFb8uxZ2mLyVmv2d8JFPcmyBChc9LjkE",
    authDomain: "women-empwr.firebaseapp.com",
    projectId: "women-empwr",
    appId: "1:230261281865:web:a5ad656bd1de125eafdb98"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  