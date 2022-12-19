import React, {Component, useState} from "react";
import {collection, doc, setDoc} from 'firebase/firestore';
import db from '../firebase';
import {v4 as uuidv4} from 'uuid';

export class FileUploader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileUploaded: null,
            visible: true
        };
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: URL.createObjectURL(img),
                visible: false
            });
        }
    }

    render() {
        return (
            <div className="banner">
                <label>
                    {
                        this.state.visible ?
                            <div style={{padding: '10%'}}>
                                <h1 className="upload-image">Upload image</h1>
                            </div> :
                            <img alt="Select image" src={this.state.image}/>
                    }
                    <input type="file" style={{display: 'none'}} name="myImage" onChange={this.onImageChange}/>
                </label>
            </div>
        )
    }
}

export function NewTour() {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const collectionRef = collection(db, 'test');

    async function addBlog() {
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

        Date.prototype.formatDay = function() {
            return this.getDay() + ' ' + monthNames[this.getMonth()] + ' ' + this.getFullYear();
        }

        const textDetail = {
            id: uuidv4(),
            author: 'Jony Bristow',
            avatar: 'https://storage.googleapis.com/tourest_bucket_xxx/author-avatar.png',
            publishedDay: date.formatDay(),
            publishedTime: date.formatTime(),
            source: 'https://storage.googleapis.com/tourest_bucket_xxx/popular-2.jpeg',
            surname: 'Admin',
            country: 'Malé',
            city: 'Nepal',
            title: title,
            text: text
        }

        try {
            setLoading(true);
            await setDoc(doc(collectionRef), textDetail).then(() => {
                setLoading(false);
            });
        } catch (error) {
            console.error(error);

        }
    }

    return (
        <div>
            <div className="banner">
                <FileUploader/>
            </div>

            <div className="blog">
                <textarea className="title" placeholder="Blog title..."
                          onChange={(e) => setTitle(e.target.value)}></textarea>
                <textarea className="article" placeholder="Start writing here..."
                          onChange={(e) => setText(e.target.value)}></textarea>
            </div>

            <div className="about-content">
                <button className="btn btn-primary"
                        disabled={loading}
                        onClick={() => addBlog()}>Share your tour Now
                </button>
            </div>
        </div>
    )
}