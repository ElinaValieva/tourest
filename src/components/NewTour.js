import {Component} from "react";
import React from 'react';

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

export class NewTour extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: ''
        };
    }

    onClick = event => {
        event.preventDefault()
        // return createNote({
        //     title: 'kek',
        //     text: 'pek'
        // }).then((e) => {
        //     console.log(e)
        //     this.setState({
        //         title: '',
        //         text: ''
        //     });
        // }).catch((err) => {
        //     console.log(err)
        // })

    }

    render() {
        return (
            <div>
                <div className="banner">
                    <FileUploader/>
                </div>

                <div className="blog">
                    <textarea className="title" value={this.state.title} placeholder="Blog title..."></textarea>
                    <textarea className="article" value={this.state.text}
                              placeholder="Start writing here..."></textarea>
                </div>

                <div className="about-content">
                    <button className="btn btn-primary" onClick={this.onClick}>Share your tour Now</button>
                </div>
            </div>
        )
    }
}