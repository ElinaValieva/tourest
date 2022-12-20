import {useEffect, useState} from "react";
import {collection, onSnapshot, limit, orderBy, query} from 'firebase/firestore';
import db from '../firebase';
import {Link} from "react-router-dom";
import {
    Box,
    Card,
    CardMedia,
    Grid,
    LinearProgress,
    Typography
} from "@mui/material";

const Countries = ({countries}) => (
    <Grid container spacing={2}>
        {countries.map((country) => (
            <Grid item xs={country.space} md={country.space} key={country.id}>
                <Link to="/tour">
                    <Card sx={{position: 'relative'}}>
                        <CardMedia
                            component="img"
                            alt={country.title}
                            height="140"
                            image={country.url}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            width: '100%',
                            zIndex: 1
                        }}>
                            <Typography
                                sx={{
                                    color: 'var(--mikado-yellow)',
                                    fontFamily: 'var(--ff-comforter-brush)',
                                    fontsize: 'var(--fs-5)'
                                }}
                                variant="h4" color="text.secondary">
                                {country.text}
                            </Typography>
                            <Typography gutterBottom sx={{
                                marginBottom: '50px',
                                color: 'var(--white-1)',
                                fontFamily: 'var(--ff-abril-fatface)'
                            }} variant="h4" color="text.secondary">
                                {country.title}
                            </Typography>
                        </div>
                    </Card>
                </Link>
            </Grid>
        ))}
    </Grid>
)

export function Destination() {
    const collectionRef = collection(db, 'destination');
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const q = query(
            collectionRef,
            orderBy('id', 'asc'),
            limit(5)
        );

        setLoading(true);
        const unsub = onSnapshot(q, (querySnapshot) => {
            const items = [];
            let index = 0
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                data.space = index <= 1 ? 6 : 4
                items.push(data);
                index++
            });
            setDestinations(items);
            setLoading(false);
        });
        return () => {
            unsub();
        };

    }, []);

    return (
        <section className="section destination">
            <div className="container">
                <p className="section-subtitle">Destinations</p>
                <h2 className="h2 section-title">Choose Your Place</h2>
                {loading ?
                    <Box sx={{width: '100%'}}>
                        <LinearProgress/>
                    </Box> : null}
                <Countries countries={destinations}/>
            </div>
        </section>
    )
}