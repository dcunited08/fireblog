import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyARhzuJmtg7Vw4MVEv8fDc7jEknVYq21Ik",
  authDomain: "jdanielcook.firebaseapp.com",
  databaseURL: "https://jdanielcook.firebaseio.com",
  projectId: "jdanielcook",
  storageBucket: "firebase-jdanielcook.appspot.com",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Export instances for use in services
export const firebaseDb = getDatabase(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
