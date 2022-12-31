import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
    Box,
    Card,
    CardMedia,
    Grid,
    LinearProgress,
    Typography
} from "@mui/material";
import {FirebaseService} from "../service/firestore";

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

export function Destination({cntItems}) {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        setLoading(true);
        FirebaseService.getDestinations(cntItems).then(destinations => {
            setDestinations(destinations);
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            console.error(err)
        });
    }

    useEffect(() => {
        fetchData();
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