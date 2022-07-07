import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKDvJdGBA9Hc6khagZvdw-oiEI7UsV-ZI",
  authDomain: "restadvisor-1153e.firebaseapp.com",
  projectId: "restadvisor-1153e",
  storageBucket: "restadvisor-1153e.appspot.com",
  messagingSenderId: "548826320434",
  appId: "1:548826320434:web:bf54e633299e0de782762b",
};

export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase);
