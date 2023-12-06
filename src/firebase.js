// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfqIYqJdJWQX1aieMiK9OcLxZd5CTReZc",
  authDomain: "chat-clone-bfd75.firebaseapp.com",
  projectId: "chat-clone-bfd75",
  storageBucket: "chat-clone-bfd75.appspot.com",
  messagingSenderId: "1023849109023",
  appId: "1:1023849109023:web:c98854b829c605f818672a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore(app)