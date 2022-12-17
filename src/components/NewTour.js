import {Component} from "react";
import React from 'react';
import {FaFileImage, FaImage, FaUpload} from "react-icons/fa";
import {Link} from "react-router-dom";

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
    render() {
        return (
            <div>
                <div className="banner">
                    <FileUploader/>
                </div>

                <div className="blog">
                    <textarea className="title" placeholder="Blog title..."></textarea>
                    <textarea className="article" placeholder="Start writing here..."></textarea>
                </div>

                <div className="about-content">
                    <button className="btn btn-primary">Share your tour Now</button>
                </div>
            </div>
        )
    }
}