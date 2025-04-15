// src/uploadToFirestore.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import data from "./dermatologists_full.json"; // Make sure this path is correct

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
const db = getFirestore(app);

const uploadDermatologists = async () => {
  const colRef = collection(db, "dermatologists");
  try {
    for (let doc of data) {
      await addDoc(colRef, doc);
    }
    console.log("✅ Successfully uploaded all dermatologists!");
  } catch (error) {
    console.error("❌ Error uploading data:", error);
  }
};

uploadDermatologists();
