// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import the getAuth function
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore'; // Import Firestor
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDK9bGFVqeNqGVfr653T7YfJlV_g_ivGfM',
  authDomain: 'techup-fcf59.firebaseapp.com',
  projectId: 'techup-fcf59',
  storageBucket: 'techup-fcf59.firebasestorage.app',
  messagingSenderId: '23853575639',
  appId: '1:23853575639:web:9dc3f0ad056e3a9ef8ef92',
  measurementId: 'G-4F8P97916L'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); 
// export { analytics };
export { auth , analytics, db};
