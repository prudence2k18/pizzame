// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDYTRJJADjGwZY2R78N3UgoYSJfQlQAM9E",
  authDomain: "pizzame-7adeb.firebaseapp.com",
  databaseURL: "https://pizzame-7adeb-default-rtdb.firebaseio.com",
  projectId: "pizzame-7adeb",
  storageBucket: "pizzame-7adeb.appspot.com",
  messagingSenderId: "991801855094",
  appId: "1:991801855094:web:cf98dfd0b272a0a2596357"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);


console.log("🔥 Firebase DB:", db);

// {
//   apiKey: "AIzaSyBskqNgXDpiuwRxLqRA8GKjy7POfBeJShY",
//   authDomain: "pizzame-be73f.firebaseapp.com",
//   projectId: "pizzame-be73f",
//   storageBucket: "pizzame-be73f.appspot.com",
//   messagingSenderId: "395129311393",
//   appId: "1:395129311393:web:f3b52313ed9bf8aebc60e0"
// };