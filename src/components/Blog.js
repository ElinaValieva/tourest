import {useEffect, useState} from "react";
import {collection, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import db from "../firebase";
import {Box, Button, LinearProgress} from "@mui/material";

const BlogCard = ({cards}) => (
    <ul className="blog-list">
        {cards.map((card) => (
            <li key={card.id}>
                <div className="blog-card">
                    <figure className="card-banner">
                        <a href="#">
                            <img src={card.source} width="740" height="518" loading="lazy"
                                 alt="A good traveler has no fixed plans and is not intent on arriving."
                                 className="img-cover"/>
                        </a>
                        <span className="card-badge">
                        <ion-icon name="time-outline"></ion-icon>
                        <time dateTime="12-04">{card.publishedDay}</time>
                    </span>
                    </figure>

                    <div className="card-content">
                        <div className="card-wrapper">
                            <div className="author-wrapper">
                                <figure className="author-avatar">
                                    <img src={card.avatar} width="30" height="30"
                                         alt={card.author}/>
                                </figure>
                                <div>
                                    <a href="#" className="author-name">{card.author}</a>
                                    <p className="author-title">{card.surname}</p>
                                </div>
                            </div>
                            <time className="publish-time" dateTime="10:30">{card.publishedTime}</time>
                        </div>

                        <h3 className="card-title">
                            <a href="#">{card.title}</a>
                        </h3>

                        <Button href="/" color="primary">Read More</Button>
                    </div>
                </div>
            </li>
        ))}
    </ul>
)

export function Blog() {
    const collectionRef = collection(db, 'blog');
    const [popularCards, setPopularCards] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const q = query(
            collectionRef,
            orderBy('id', 'asc'),
            limit(3)
        );

        setLoading(true);
        const unsub = onSnapshot(q, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setPopularCards(items);
            setLoading(false);
        });
        return () => {
            unsub();
        };

    }, []);

    return (
        <section className="section blog">
            <div className="container">
                <p className="section-subtitle">From The Blog Post</p>
                <h2 className="h2 section-title">Latest News & Articles</h2>
                {loading ?
                    <Box sx={{width: '100%'}}>
                        <LinearProgress/>
                    </Box> : null}
                <BlogCard cards={popularCards}/>
            </div>
        </section>
    )
}