import {Component} from "react";

const HeaderMenu = ({links}) => (
    <ul className="navbar-list">
        {links.map((link) => (
            <li>
                <a href={link.href} className="navbar-link">{link.name}</a>
            </li>
        ))}
    </ul>
)

const links = [
    {
        name: 'Home',
        href: '#'
    },
    {
        name: 'About Us',
        href: '#'
    },
    {
        name: 'Destinations',
        href: '#'
    },
    {
        name: 'Blog',
        href: '#'
    },
    {
        name: 'Contact Us',
        href: '#'
    }
]

export class Header extends Component {
    render() {
        return (
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
                        <HeaderMenu links={links}/>
                        <a href="#" className="btn btn-secondary">Share your tour Now</a>
                    </nav>
                </div>
            </header>
        )
    }
}