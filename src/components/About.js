import {Component} from "react";
import {FaBriefcase, FaCompass, FaUmbrella} from "react-icons/fa";

const Tips = ({tips}) => (
    <ul className="about-list">
        {tips.map((tip) => (
            <li className="about-item" key={tip.title}>
                <div className="about-item-icon">
                    {tip.component}
                </div>
                <div className="about-item-content">
                    <h3 className="h3 about-item-title">{tip.title}</h3>
                    <p className="about-item-text">{tip.description}</p>
                </div>
            </li>
        ))}
    </ul>
)

const tips = [
    {
        component: <FaCompass/>,
        title: 'Tour guide',
        description: 'Lorem Ipsum available, but the majority have suffered alteration in some.'
    },
    {
        component: <FaBriefcase/>,
        title: 'Friendly price',
        description: 'Lorem Ipsum available, but the majority have suffered alteration in some.'
    },
    {
        component: <FaUmbrella/>,
        title: 'Reliable tour',
        description: 'Lorem Ipsum available, but the majority have suffered alteration in some.'
    }
]

export class About extends Component {
    render() {
        return (
            <section className="section about">
                <div className="container">
                    <div className="about-content">
                        <p className="section-subtitle">About Us</p>
                        <h2 className="h2 section-title">Explore all tour of the world with us.</h2>
                        <p className="about-text">
                            Lorem Ipsum available, but the majority have suffered alteration in some form, by injected
                            humour, or
                            randomised words
                            which don't look even slightly believable.
                        </p>
                        <Tips tips={tips}/>
                        <a href="#" className="btn btn-primary">Share your tour Now</a>
                    </div>

                    <figure className="about-banner">
                        <img src="/assets/images/about-banner.png" width="756" height="842" loading="lazy" alt=""
                             className="w-100"/>
                    </figure>
                </div>
            </section>
        )
    }
}