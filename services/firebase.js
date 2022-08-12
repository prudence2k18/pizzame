// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBskqNgXDpiuwRxLqRA8GKjy7POfBeJShY",
  authDomain: "pizzame-be73f.firebaseapp.com",
  projectId: "pizzame-be73f",
  storageBucket: "pizzame-be73f.appspot.com",
  messagingSenderId: "395129311393",
  appId: "1:395129311393:web:f3b52313ed9bf8aebc60e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);