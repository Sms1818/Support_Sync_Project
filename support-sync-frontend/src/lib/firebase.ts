import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkMUP2u1YIcoKb8CqQi6bV6S3z4YZ-t98",
  authDomain: "supportsync-1c3cb.firebaseapp.com",
  projectId: "supportsync-1c3cb",
  storageBucket: "supportsync-1c3cb.appspot.com",
  messagingSenderId: "715244637062",
  appId: "1:715244637062:web:289905ca47d8e1482dfa07",
  measurementId: "G-4Q5D4PYMWK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };