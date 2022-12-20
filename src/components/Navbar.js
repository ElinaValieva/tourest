import {Component} from "react";
import {Button} from "@mui/material";

const NavbarMenu = ({links}) => (
    <div className="navbar-list">
        {links.map((link) => (
            <Button key={link.name} href={link.href} color="info">{link.name}</Button>
        ))}
    </div>
)

const links = [
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
                    <h1 className="logo">
                        <Button style={{fontSize: '18px', fontWeight: 'bold'}} href="/" color={"info"} size="large">Tourest</Button>
                    </h1>
                    <nav className="navbar">
                        <NavbarMenu links={links}/>
                        <Button href="/new" color="info">Share your tour Now</Button>
                    </nav>
                </div>
            </header>
        )
    }
}