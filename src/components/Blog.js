import {useEffect, useState} from "react";
import {Avatar, Box, Card, CardContent, CardHeader, CardMedia, Grid, LinearProgress, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {getPosts} from "../service/firestore";

const BlogCard = ({cards}) => (
    <Grid container spacing={2}>
        {cards.map((card) => (
            <Grid item xs={4} key={card.id}>
                <Link to={card.id + ""}>
                    <Card sx={{maxWidth: 345, height: 450, display: 'block'}}>
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
                    </Card>
                </Link>
            </Grid>
        ))}
    </Grid>
)

export function Blog({limitCnt}) {
    const [popularCards, setPopularCards] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        return getPosts(limitCnt,
            (querySnapshot) => {
                const updatedGroceryItems = querySnapshot.docs.map(docSnapshot => {
                    let data = docSnapshot.data();
                    data.id = docSnapshot.id;
                    return data
                });
                setPopularCards(updatedGroceryItems);
                setLoading(false);
            },
            (error) => console.log(error)
        );
    }, [limitCnt, setPopularCards, setLoading]);

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