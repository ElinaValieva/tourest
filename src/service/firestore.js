import {addDoc, collection, doc, getDoc, getFirestore, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

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
const storage = getStorage();
const auth = getAuth(app);


function getPosts(db, limitCnt, snapshot, error) {
    const itemsColRef = collection(db, 'tourest')
    const itemsQuery = query(itemsColRef, orderBy('id', 'asc'), limit(limitCnt))
    return onSnapshot(itemsQuery, snapshot, error);
}

function getDestinations(db, limitCnt, snapshot, error) {
    const itemsColRef = collection(db, 'destination')
    const itemsQuery = query(itemsColRef, orderBy('id', 'asc'), limit(limitCnt))
    return onSnapshot(itemsQuery, snapshot, error);
}

export const FirebaseService = {
    getPostById: async function (id) {
        const querySnapshot = await getDoc(doc(db, 'tourest', id));
        return querySnapshot.data();
    },

    addPost: async function (data) {
        if (!localStorage.getItem('name')) {
            signWithGoogle()
        }
        data.author = localStorage.getItem('name')
        data.photo = localStorage.getItem('photo')
        return await addDoc(collection(db, 'tourest'), data);
    },

    getPosts: function (limitCnt) {
        return new Promise((resolve, reject) => getPosts(db, limitCnt,
            (querySnapshot) => {
                const updatedGroceryItems = querySnapshot.docs.map(docSnapshot => {
                    let data = docSnapshot.data();
                    data.id = docSnapshot.id;
                    return data
                });
                resolve(updatedGroceryItems)
            },
            (error) => {
                console.log(error)
                reject(error)
            }
        ));
    },

    getDestinations: function (limitCnt) {
        return new Promise((resolve, reject) => getDestinations(db, limitCnt,
            (querySnapshot) => {
                let index = 0
                const updatedGroceryItems = querySnapshot.docs.map(docSnapshot => {
                    let data = docSnapshot.data();
                    data.space = index <= 1 ? 6 : 4
                    index++
                    return data
                });
                resolve(updatedGroceryItems)
            },
            (error) => {
                console.log(error)
                reject(error)
            }
        ));
    },

    uploadImage: function (image) {
        const storageRef = ref(storage, `/files/${image.name}`)
        return uploadBytes(storageRef, image).then((r) => {
            return getDownloadURL(r.ref)
        });
    }
}

const provider = new GoogleAuthProvider();

export const signWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        localStorage.setItem('photo', result.user.photoURL)
        localStorage.setItem('name', result.user.displayName)
    }).catch((error) => console.log(error))
}
