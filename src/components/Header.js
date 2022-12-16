import {Component} from "react";

export class Header extends Component {
    render() {
        return(
            <header className="header">
                <div className="container">
                    <a href="#">
                        <h1 className="logo">Tourest</h1>
                    </a>
                    <button className="nav-toggle-btn" aria-label="Toggle Menu">
                        <ion-icon name="menu-outline" className="open"></ion-icon>
                        <ion-icon name="close-outline" className="close"></ion-icon>
                    </button>
                    <nav className="navbar">
                        <ul className="navbar-list">
                            <li>
                                <a href="#" className="navbar-link">Home</a>
                            </li>
                            <li>
                                <a href="#" className="navbar-link">About Us</a>
                            </li>
                            <li>
                                <a href="#" className="navbar-link">Destinations</a>
                            </li>
                            <li>
                                <a href="#" className="navbar-link">Blog</a>
                            </li>
                            <li>
                                <a href="#" className="navbar-link">Contact Us</a>
                            </li>
                        </ul>
                        <a href="#" className="btn btn-secondary">Share your tour Now</a>
                    </nav>
                </div>
            </header>
        )
    }
}