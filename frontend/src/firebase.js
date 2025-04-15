// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIsNuHwNQa0NM6hyv8YvEqSqvLqIv_ELs",
  authDomain: "sderma-c0307.firebaseapp.com",
  projectId: "sderma-c0307",
  storageBucket: "sderma-c0307.firebasestorage.app",
  messagingSenderId: "523360858655",
  appId: "1:523360858655:web:0cc85a661983dd3d271b2a",
  measurementId: "G-VJ6FV3Z3P2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
