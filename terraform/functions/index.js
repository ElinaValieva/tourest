import {doc, getDoc, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import * as pkg from "@google-cloud/functions-framework";

async function getPostById(db, id) {
    let result = await getDoc(doc(db, 'tourest', id));
    return result.data();
}

pkg.http('post', (req, res) => {
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    let id = req.body.id
    return getPostById(db, id).then(e => {
        console.log('Result: ' + JSON.stringify(e))
        res.send(e)
    });
});