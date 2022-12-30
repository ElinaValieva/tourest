import {Box, Container, Grid, LinearProgress, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import {CodeBlock} from "./CodeBlock";
import {FirebaseService} from "../service/firestore"

export function Tour() {
    let {id} = useParams();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [photo, setPhoto] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        FirebaseService.getPostById(id).then(item => {
            console.log(item)
            setText(item.text);
            setTitle(item.title);
            setImage(item.source);
            setAuthor(item.author);
            setPhoto(item.photo);
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
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            <Typography>
                                <img style={{width: '50px', borderRadius: '50%'}} src={photo}/>
                            </Typography>
                        </Grid>
                        <Grid item xs={11}>
                            <Typography variant={"h1"} sx={{textAlign: 'left', marginTop: '15px'}}>
                                {author}
                            </Typography>
                        </Grid>
                    </Grid>
                    <h1 className="h2 section-title" style={{textAlign: 'center'}}>{title}</h1>
                    <img style={{objectFit: 'contain', height: '500px', display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%'}} alt="Select image" src={image}/>
                    <ReactMarkdown className="markdown-text"
                                   remarkPlugins={[remarkGfm]}
                                   renderers={{code: CodeBlock}}>{text.formatSpacesAsText()}</ReactMarkdown>
                </div>
            }
        </Container>
    )
}