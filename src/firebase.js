import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4PttVGUFUKuKPCm31lhlAMqg3QAdDhas",
  authDomain: "running-tracker-539ab.firebaseapp.com",
  projectId: "running-tracker-539ab",
  storageBucket: "running-tracker-539ab.firebasestorage.app",
  messagingSenderId: "866393450555",
  appId: "1:866393450555:web:f2a77e31a29774a954541e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
