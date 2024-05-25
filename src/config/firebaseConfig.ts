// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9RhZKFq1GYjMsJmBidrui-FLEIF3IDWQ",
  authDomain: "oec-web-9d0ed.firebaseapp.com",
  projectId: "oec-web-9d0ed",
  storageBucket: "oec-web-9d0ed.appspot.com",
  messagingSenderId: "86554653550",
  appId: "1:86554653550:web:beabe1137ace260552877f",
  measurementId: "G-Z52DFF76LY"
};

// Initialize Firebase
let analytics;
const app = initializeApp(firebaseConfig);
if (app.name && typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
// let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { auth };