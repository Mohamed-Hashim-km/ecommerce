import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkBgXU9mYkKnGpRhKP5VneFFCJnehoGos",
  authDomain: "myecom-1727f.firebaseapp.com",
  projectId: "myecom-1727f",
  storageBucket: "myecom-1727f.firebasestorage.app",
  messagingSenderId: "320709620759",
  appId: "1:320709620759:web:e952114a9764bfbc469852",
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { auth, fireDB };
