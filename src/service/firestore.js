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
        let cachedItem = localStorage.getItem(id);
        if (cachedItem) {
            console.log('Fetching data from cache')
            return JSON.parse(cachedItem)
        } else {
            console.log('Fetching data from firebase')
            const querySnapshot = await getDoc(doc(db, 'tourest', id));
            let fetchedItem = querySnapshot.data();
            localStorage.setItem(id, JSON.stringify(fetchedItem))
            return fetchedItem;
        }
    },

    addPost: async function (data) {
        if (!localStorage.getItem('name')) {
            signWithGoogle()
        }
        data.author = localStorage.getItem('name')
        data.photo = localStorage.getItem('photo')
        localStorage.removeItem('posts')
        return await addDoc(collection(db, 'tourest'), data);
    },

    getPosts: function (limitCnt) {
        let cachedItems = localStorage.getItem(`posts${limitCnt}`);
        if (cachedItems) {
            return Promise.resolve(JSON.parse(cachedItems))
        } else {
            return new Promise((resolve, reject) => getPosts(db, limitCnt,
                (querySnapshot) => {
                    const fetchedItems = querySnapshot.docs.map(docSnapshot => {
                        let data = docSnapshot.data();
                        data.id = docSnapshot.id;
                        return data
                    });
                    localStorage.setItem(`posts${limitCnt}`, JSON.stringify(fetchedItems))
                    resolve(fetchedItems)
                },
                (error) => {
                    console.log(error)
                    reject(error)
                }
            ));
        }
    },

    getDestinations: function (limitCnt) {
        let items = localStorage.getItem('destinations');
        if (items) {
            return Promise.resolve(JSON.parse(items))
        } else {
            return new Promise((resolve, reject) => getDestinations(db, limitCnt,
                (querySnapshot) => {
                    let index = 0
                    const fetchedItems = querySnapshot.docs.map(docSnapshot => {
                        let data = docSnapshot.data();
                        data.space = index <= 1 ? 6 : 4
                        index++
                        return data
                    });
                    localStorage.setItem('destinations', JSON.stringify(fetchedItems))
                    resolve(fetchedItems)
                },
                (error) => {
                    console.log(error)
                    reject(error)
                }
            ));
        }
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
