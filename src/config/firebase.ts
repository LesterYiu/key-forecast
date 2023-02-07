import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD4656oVeffQzYqJCRrXpm_fxPrULXN7qw",
    authDomain: "key-forecast-10ea3.firebaseapp.com",
    projectId: "key-forecast-10ea3",
    storageBucket: "key-forecast-10ea3.appspot.com",
    messagingSenderId: "333533353946",
    appId: "1:333533353946:web:c5f5c4672e3040313e12e3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);