import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGo6s4BlTUhn7BU64GtdVR1yMnSeQaBY8",
  authDomain: "atv4-38a16.firebaseapp.com",
  projectId: "atv4-38a16",
  storageBucket: "atv4-38a16.appspot.com",
  messagingSenderId: "703338113008",
  appId: "1:703338113008:web:f786819e6dc0be5e165f35",
  measurementId: "G-5WT16HE52X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);