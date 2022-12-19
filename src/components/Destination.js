import {useEffect, useState} from "react";
import {
    collection,
    onSnapshot,
    limit,
    orderBy,
    query
} from 'firebase/firestore';
import db from './firebase';
import {Link} from "react-router-dom";

const Countries = ({countries}) => (
    <ul className="destination-list">
        {countries.map((country) => (
            <li className={country.class} key={country.id}>
                <Link to='/tour' className="destination-card">
                    <figure className="card-banner">
                        <img src={country.url} width={country.width} height={country.height}
                             loading="lazy"
                             alt={country.title} className="img-cover"/>
                    </figure>
                    <div className="card-content">
                        <p className="card-subtitle">{country.text}</p>
                        <h3 className="h3 card-title">{country.title}</h3>
                    </div>
                </Link>
            </li>
        ))}
    </ul>
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
                data.height = 1100
                data.width = index <= 1 ? 1140 : 480
                data.class = index <= 1 ? 'w-50' : ''
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
                <ul className="destination-list">
                    {loading ? <h1>Loading...</h1> : null}
                    <Countries countries={destinations}/>
                </ul>
            </div>
        </section>
    )
}