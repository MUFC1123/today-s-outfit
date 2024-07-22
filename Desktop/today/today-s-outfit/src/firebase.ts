import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCNB7XHKKCBsNfpw1pLISMWS9zggPPnCCo",
  authDomain: "today-s-outfit.firebaseapp.com",
  projectId: "today-s-outfit",
  storageBucket: "today-s-outfit.appspot.com",
  messagingSenderId: "349324213066",
  appId: "1:349324213066:web:c8056115803d295efd9fb3",
  measurementId: "G-BZ7EHD8DZ4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);


export { auth, db };  