import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBaBiVelTj_vAI0zO-RimrcDKntshbLz6g",
    authDomain: "gcp-playground-06071995.firebaseapp.com",
    projectId: "gcp-playground-06071995",
    storageBucket: "gcp-playground-06071995.appspot.com",
    messagingSenderId: "253120544678",
    appId: "1:253120544678:web:2e83db47d66e6d2c639967",
    measurementId: "G-H5JJ41HSV9"
};

const app = initializeApp(firebaseConfig);
export default getFirestore(app);
