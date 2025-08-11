import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Firebase configuration - Replace with your actual config
// const firebaseConfig = {
//   apiKey: "your-api-key-here",
//   authDomain: "your-project.firebaseapp.com",
//   projectId: "your-project-id",
//   storageBucket: "your-project.appspot.com",
//   messagingSenderId: "123456789",
//   appId: "your-app-id"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCNKRqo71xWw89kQBXt46jlZ2EVzKJsgmI",
  authDomain: "react-first-982d5.firebaseapp.com",
  databaseURL: "https://react-first-982d5-default-rtdb.firebaseio.com",
  projectId: "react-first-982d5",
  storageBucket: "react-first-982d5.appspot.com",
  messagingSenderId: "572260985460",
  appId: "1:572260985460:web:d941c8ec10850563a9ff21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;