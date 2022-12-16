import {Component} from "react";

const Countries = ({countries}) => (
    <ul className="destination-list">
        {countries.map((country) => (
            <li className={country.class}>
                <a href="#" className="destination-card">
                    <figure className="card-banner">
                        <img src={country.url} width={country.width} height={country.height}
                             loading="lazy"
                             alt={country.title} className="img-cover"/>
                    </figure>
                    <div className="card-content">
                        <p className="card-subtitle">{country.text}</p>
                        <h3 className="h3 card-title">{country.title}</h3>
                    </div>
                </a>
            </li>
        ))}
    </ul>
)

const cardInfo = [
    {
        title: "Maldives",
        text: "Malé",
        url: "/assets/images/destination-1.jpeg",
        height: 1100,
        width: 1140,
        class: "w-50"
    },
    {
        title: "Thailand",
        text: "Bangkok",
        url: "/assets/images/destination-2.jpeg",
        height: 1100,
        width: 1140,
        class: "w-50"
    },
    {
        title: "Malaysia",
        text: "Kuala Lumpur",
        url: "/assets/images/destination-3.jpeg",
        height: 1100,
        width: 480,
        class: ""
    },
    {
        title: "Nepal",
        text: "Kathmandu",
        url: "/assets/images/destination-4.jpeg",
        height: 1100,
        width: 480,
        class: ""
    },
    {
        title: "Indonesia",
        text: "Jakarta",
        url: "/assets/images/destination-5.jpeg",
        height: 1100,
        width: 480,
        class: ""
    }
]

export class Destination extends Component {
    render() {
        return (
            <section className="section destination">
                <div className="container">
                    <p className="section-subtitle">Destinations</p>
                    <h2 className="h2 section-title">Choose Your Place</h2>
                    <ul className="destination-list">
                        <Countries countries={cardInfo}/>
                    </ul>
                </div>
            </section>
        )
    }
}