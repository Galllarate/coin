// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOCw5dSCWfRJ3YAHocYKjVbgn4uND92dk",
    authDomain: "coin-e2cda.firebaseapp.com",
    projectId: "coin-e2cda",
    storageBucket: "coin-e2cda.appspot.com",
    messagingSenderId: "857949384301",
    appId: "1:857949384301:web:0693966725896697d6d964"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const dataBase  = getFirestore(app);

export {dataBase, auth};