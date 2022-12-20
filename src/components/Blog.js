import {useEffect, useState} from "react";
import {collection, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import db from "../firebase";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia, Grid,
    LinearProgress,
    Typography
} from "@mui/material";

const BlogCard = ({cards}) => (
    <Grid container spacing={2}>
        {cards.map((card) => (
            <Grid item xs={4} key={card.id}>
                <Card sx={{maxWidth: 345}}>
                    <CardMedia
                        component="img"
                        alt="image source"
                        height="140"
                        image={card.source}
                    />
                    <CardHeader
                        avatar={
                            <Avatar sx={{backgroundColor: 'hsl(47, 98%, 50%)'}} aria-label="card">
                                {card.author.split(' ').map(e => e.charAt(0).toUpperCase())}
                            </Avatar>
                        }
                        title={
                            <Typography variant={"h1"} sx={{textAlign: 'left', marginTop: '5%'}}>
                                {card.author}
                            </Typography>
                        }
                        subheader={
                            <Typography variant={"h3"} sx={{textAlign: 'right'}}>
                                {card.publishedDay} {card.publishedTime}
                            </Typography>
                        }
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {card.title}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button sx={{left: '65%', padding: '2%'}} size="small">Read More</Button>
                    </CardActions>
                </Card>
            </Grid>
        ))}
    </Grid>
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