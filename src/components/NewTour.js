import React, {useState} from "react";
import {collection, doc, setDoc} from 'firebase/firestore';
import db from '../firebase';
import {v4 as uuidv4} from 'uuid';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {Button, Container, TextField} from "@mui/material";

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
    const [source, setSource] = useState(null)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(true)

    function onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
            setSource(URL.createObjectURL(event.target.files[0]))
            setVisible(false)
        }
    }

    const storage = getStorage()
    const collectionRef = collection(db, 'tourest');

    async function createPost(url) {
        let date = DateUtil();

        const textDetail = {
            id: date.getMilliseconds(),
            uuid: uuidv4(),
            author: 'Jony Bristow',
            published: `${date.formatDay()}  ${date.formatTime()}`,
            source: url,
            city: 'Malé',
            country: 'Nepal',
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
            <Container maxWidth="xl" fixed sx={{
                '& .MuiTextField-root': {m: 1, width: '100%'},
            }}>
                <div className="blog">
                    <TextField
                        id="standard-multiline-flexible"
                        label="Title"
                        multiline
                        maxRows={4}
                        variant="standard"
                        onChange={(e) => setTitle(e.target.value)}
                        size="normal"
                        margin="normal"
                    />
                    <div className="banner">
                        <label>
                            {
                                visible ?
                                    <div style={{padding: '10%'}}>
                                        <h1 className="upload-image">Upload image</h1>
                                    </div> :
                                    <img className="banner-image" alt="Select image" src={source}/>
                            }
                            <input type="file" style={{display: 'none'}} name="myImage"
                                   onChange={(event) => onImageChange(event)}/>
                        </label>
                    </div>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Start writing here .."
                        multiline
                        minRows={4}
                        variant="standard"
                        onChange={(e) => setText(e.target.value.replace(/(?:\r\n|\r|\n)/g, '<br/>'))}
                    />
                </div>

                <div className="banner-btn">
                    <Button variant="outlined"
                            disabled={loading}
                            size="large"
                            onClick={() => createPostWithSource()}>Share post</Button>
                </div>
            </Container>
        </div>
    )
}