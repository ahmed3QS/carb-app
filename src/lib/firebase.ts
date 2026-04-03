import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdyR7kNvCWX0hAdTxI2vUm7dnreItfVIA",
  authDomain: "carb-app-3bdcc.firebaseapp.com",
  projectId: "carb-app-3bdcc",
  storageBucket: "carb-app-3bdcc.firebasestorage.app",
  messagingSenderId: "313662026215",
  appId: "1:313662026215:web:223c7b7a7ee48d8979cd42",
  measurementId: "G-WZQXRW8864"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

if (typeof window !== "undefined") {
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.error("Auth persistence error:", err);
  });
}

const db = getFirestore(app);

export { app, auth, db };
