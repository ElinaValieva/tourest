import React, {useState} from "react";
import {collection, doc, setDoc} from 'firebase/firestore';
import db from '../firebase';
import {v4 as uuidv4} from 'uuid';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

function DateUtil() {
    let date = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    Date.prototype.formatTime = function () {
        let hours = this.getHours();
        let minutes = this.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    }

    Date.prototype.formatDay = function () {
        return this.getDay() + ' ' + monthNames[this.getMonth()] + ' ' + this.getFullYear();
    }
    return date;
}

export function NewTour() {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(true)

    function onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]))
            setVisible(false)
        }
    }

    const storage = getStorage()
    const collectionRef = collection(db, 'test');

    async function createPost(url) {
        let date = DateUtil();

        const textDetail = {
            id: uuidv4(),
            author: 'Jony Bristow',
            avatar: 'https://storage.googleapis.com/tourest_bucket_xxx/author-avatar.png',
            publishedDay: date.formatDay(),
            publishedTime: date.formatTime(),
            source: url,
            surname: 'Admin',
            country: 'Malé',
            city: 'Nepal',
            title: title,
            text: text
        }

        try {
            await setDoc(doc(collectionRef), textDetail).then(() => {
                setLoading(false);
            });
        } catch (error) {
            console.error(error);
        }
    }

    function createPostWithSource() {
        const storageRef = ref(storage, `/files/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image);
        setLoading(true)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    createPost(url).then((e) => console.log(e))
                });
            }
        );
    }

    return (
        <div>
            <div className="blog">
                <textarea className="title" placeholder="Blog title..."
                          onChange={(e) => setTitle(e.target.value)}></textarea>
                <div className="banner">
                    <div className="banner">
                        <label>
                            {
                                visible ?
                                    <div style={{padding: '10%'}}>
                                        <h1 className="upload-image">Upload image</h1>
                                    </div> :
                                    <img className="banner-image" alt="Select image" src={image}/>
                            }
                            <input type="file" style={{display: 'none'}} name="myImage"
                                   onChange={(event) => onImageChange(event)}/>
                        </label>
                    </div>
                </div>
                <textarea className="article" placeholder="Start writing here..."
                          onChange={(e) => setText(e.target.value)}></textarea>
            </div>

            <div className="banner-btn">
                <button className="btn btn-primary"
                        disabled={loading}
                        onClick={() => createPostWithSource()}>Share your tour Now
                </button>
            </div>
        </div>
    )
}