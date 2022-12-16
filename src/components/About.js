import {Component} from "react";
import {FaBriefcase, FaCompass, FaUmbrella} from "react-icons/fa";

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

                        <ul className="about-list">
                            <li className="about-item">
                                <div className="about-item-icon">
                                    <FaCompass/>
                                </div>
                                <div className="about-item-content">
                                    <h3 className="h3 about-item-title">Tour guide</h3>
                                    <p className="about-item-text">
                                        Lorem Ipsum available, but the majority have suffered alteration in some.
                                    </p>
                                </div>
                            </li>

                            <li className="about-item">
                                <div className="about-item-icon">
                                    <FaBriefcase/>
                                </div>
                                <div className="about-item-content">
                                    <h3 className="h3 about-item-title">Friendly price</h3>
                                    <p className="about-item-text">
                                        Lorem Ipsum available, but the majority have suffered alteration in some.
                                    </p>
                                </div>

                            </li>

                            <li className="about-item">
                                <div className="about-item-icon">
                                    <FaUmbrella/>
                                </div>
                                <div className="about-item-content">
                                    <h3 className="h3 about-item-title">Reliable tour</h3>

                                    <p className="about-item-text">
                                        Lorem Ipsum available, but the majority have suffered alteration in some.
                                    </p>
                                </div>
                            </li>
                        </ul>
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