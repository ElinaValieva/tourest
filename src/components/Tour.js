import {Box, Container, LinearProgress} from "@mui/material";
import React, {PureComponent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import db from "../firebase";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import PropTypes from "prop-types";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from "react-syntax-highlighter/src/styles/hljs";

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
                    <h1 className="h2 section-title" style={{textAlign: 'left'}}>{title}</h1>
                    <img style={{objectFit: 'contain', height: '500px'}} alt="Select image" src={image}/>
                    <ReactMarkdown className="markdown-text"
                        remarkPlugins={[remarkGfm]}
                        renderers={{ code: CodeBlock }}>{text.replaceAll('<br/>', "\n")}</ReactMarkdown>
                </div>
            }
        </Container>
    )
}

export class CodeBlock extends PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        language: PropTypes.string
    };

    static defaultProps = {
        language: null
    };

    render() {
        const { language, value } = this.props;
        return (
            <SyntaxHighlighter language={language} style={docco}>
                {value}
            </SyntaxHighlighter>
        );
    }
}