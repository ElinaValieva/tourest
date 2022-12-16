import {Component} from "react";

export class Destination extends Component {
    render() {
        return (
            <section className="section destination">
                <div className="container">

                    <p className="section-subtitle">Destinations</p>

                    <h2 className="h2 section-title">Choose Your Place</h2>

                    <ul className="destination-list">

                        <li className="w-50">
                            <a href="#" className="destination-card">

                                <figure className="card-banner">
                                    <img src="/assets/images/destination-1.jpeg" width="1140" height="1100"
                                         loading="lazy"
                                         alt="Malé, Maldives" className="img-cover"/>
                                </figure>

                                <div className="card-content">
                                    <p className="card-subtitle">Malé</p>

                                    <h3 className="h3 card-title">Maldives</h3>
                                </div>

                            </a>
                        </li>

                        <li className="w-50">
                            <a href="#" className="destination-card">

                                <figure className="card-banner">
                                    <img src="/assets/images/destination-2.jpeg" width="1140" height="1100"
                                         loading="lazy"
                                         alt="Bangkok, Thailand" className="img-cover"/>
                                </figure>

                                <div className="card-content">
                                    <p className="card-subtitle">Bangkok</p>
                                    <h3 className="h3 card-title">Thailand</h3>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="destination-card">

                                <figure className="card-banner">
                                    <img src="/assets/images/destination-3.jpeg" width="1110" height="480"
                                         loading="lazy"
                                         alt="Kuala Lumpur, Malaysia" className="img-cover"/>
                                </figure>
                                <div className="card-content">
                                    <p className="card-subtitle">Kuala Lumpur</p>

                                    <h3 className="h3 card-title">Malaysia</h3>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="destination-card">
                                <figure className="card-banner">
                                    <img src="/assets/images/destination-4.jpeg" width="1110" height="480"
                                         loading="lazy"
                                         alt="Kathmandu, Nepal" className="img-cover"/>
                                </figure>
                                <div className="card-content">
                                    <p className="card-subtitle">Kathmandu</p>

                                    <h3 className="h3 card-title">Nepal</h3>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="destination-card">

                                <figure className="card-banner">
                                    <img src="/assets/images/destination-5.jpeg" width="1110" height="480"
                                         loading="lazy"
                                         alt="Jakarta, Indonesia" className="img-cover"/>
                                </figure>

                                <div className="card-content">
                                    <p className="card-subtitle">Jakarta</p>

                                    <h3 className="h3 card-title">Indonesia</h3>
                                </div>

                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        )
    }
}