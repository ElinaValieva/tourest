import {addDoc, collection, doc, getDoc, getFirestore, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

console.debug(firebaseConfig)

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage()

export const getPostById = async (id) => {
    const querySnapshot = await getDoc(doc(db, 'tourest', id));
    return querySnapshot.data();
}

export const addPost = async (textDetail) => {
    return await addDoc(collection(db, 'tourest'), textDetail);
}

export const getPosts = (limitCnt, snapshot, error) => {
    const itemsColRef = collection(db, 'tourest')
    const itemsQuery = query(itemsColRef, orderBy('id', 'asc'), limit(limitCnt))
    return onSnapshot(itemsQuery, snapshot, error);
};

export const getDestinations = (snapshot, error) => {
    const itemsColRef = collection(db, 'destination')
    const itemsQuery = query(itemsColRef, orderBy('id', 'asc'), limit(5))
    return onSnapshot(itemsQuery, snapshot, error);
};

export const uploadImage = (image) => {
    const storageRef = ref(storage, `/files/${image.name}`)
    return uploadBytes(storageRef, image).then((r) => {
        console.log(r)
        return getDownloadURL(r.ref)
    });
}