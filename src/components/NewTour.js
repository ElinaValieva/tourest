import React, {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {useHistory} from "react-router-dom"
import {Button, Container, TextField} from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {DateUtil} from "../service/utils";
import {CodeBlock} from "./CodeBlock";
import {FirebaseService} from "../service/firestore";

export function NewTour() {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [source, setSource] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(true);
    const [preview, setPreview] = useState(false)
    let navigate = useHistory()

    function onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
            setSource(URL.createObjectURL(event.target.files[0]))
            setVisible(false)
        }
    }

    function createPost(url) {
        let date = DateUtil();

        try {
            FirebaseService.addPost({
                id: date.getMilliseconds(),
                uuid: uuidv4(),
                photo: localStorage.getItem('photo'),
                author: localStorage.getItem('name'),
                published: `${date.formatDay()}  ${date.formatTime()}`,
                source: url,
                city: 'Malé',
                country: 'Nepal',
                title: title,
                text: text
            }).then((res) => {
                setLoading(false);
                navigate.push(`/${res.id}`)
            });
        } catch (error) {
            console.error(error);
        }
    }

    function createPostWithSource() {
        setLoading(true)

        FirebaseService.uploadImage(image)
            .then((url) => {
                createPost(url)
            });
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
                    <Button variant="contained"
                            sx={{margin: '10px 7px', display: 'flex'}}
                            onClick={() => setPreview(!preview)}>Preview</Button>
                    {preview && text
                        ?
                        <ReactMarkdown className="markdown-text"
                                       remarkPlugins={[remarkGfm]}
                                       renderers={{code: CodeBlock}}>{text.formatSpacesAsText()}</ReactMarkdown>
                        :
                        <TextField
                            defaultValue={text}
                            id="standard-multiline-flexible"
                            label="Start writing here .."
                            multiline
                            minRows={4}
                            variant="standard"
                            onChange={(e) => setText(e.target.value.formatSpacesAsHtml())}
                        />
                    }
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