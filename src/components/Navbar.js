import {Component} from "react";
import {Link} from "react-router-dom";

const NavbarMenu = ({links}) => (
    <ul className="navbar-list">
        {links.map((link) => (
            <li key={link.name}>
                <Link to={link.href} className="navbar-link">{link.name}</Link>
            </li>
        ))}
    </ul>
)

const links = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'About Us',
        href: '/about'
    },
    {
        name: 'Destinations',
        href: '/destination'
    },
    {
        name: 'Blog',
        href: '/blog'
    }
]

export class Navbar extends Component {
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
                        <NavbarMenu links={links}/>
                        <Link to="/new" className="btn btn-secondary">Share your tour Now</Link>
                    </nav>
                </div>
            </header>
        )
    }
}