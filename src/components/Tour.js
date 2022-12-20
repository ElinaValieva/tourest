import {Box, Container, LinearProgress} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import db from "../firebase";

export function Tour() {
    let {id} = useParams();

    const collectionRef = doc(db, 'tourest', id);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getSchools = async () => {
            setLoading(true);

            const querySnapshot = await getDoc(collectionRef);
            const item = querySnapshot.data();

            console.log(item)
            setText(item.text);
            setTitle(item.title);
            setImage(item.source)
            setLoading(false);
        };

        try {
            getSchools();
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <Container maxWidth="xl" fixed sx={{
            '& .MuiTextField-root': {m: 1, width: '100%'},
        }}>
            {loading ?
                <Box sx={{width: '100%'}}>
                    <LinearProgress/>
                </Box> :
                <div className="blog">
                    <h1>{title}</h1>
                    <div className="banner">
                        <img className="banner-image" alt="Select image" src={image}/>
                    </div>
                    <p>{text}</p>
                </div>
            }
        </Container>
    )
}