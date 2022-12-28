import {Box, Container, LinearProgress} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import {CodeBlock} from "./CodeBlock";
import {getPostById} from "../service/firestore"

export function Tour() {
    let {id} = useParams();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPostById(id).then(item => {
            setText(item.text);
            setTitle(item.title);
            setImage(item.source)
            setLoading(false);
        }).catch((e) => console.error(e));

    }, [id, setText, setTitle, setLoading]);

    return (
        <Container maxWidth="xl" fixed sx={{
            '& .MuiTextField-root': {m: 1, width: '100%'},
        }}>
            {loading ?
                <Box sx={{width: '100%'}}>
                    <LinearProgress/>
                </Box> :
                <div className="blog">
                    <h1 className="h2 section-title" style={{textAlign: 'left'}}>{title}</h1>
                    <img style={{objectFit: 'contain', height: '500px'}} alt="Select image" src={image}/>
                    <ReactMarkdown className="markdown-text"
                                   remarkPlugins={[remarkGfm]}
                                   renderers={{code: CodeBlock}}>{text.formatSpacesAsText()}</ReactMarkdown>
                </div>
            }
        </Container>
    )
}