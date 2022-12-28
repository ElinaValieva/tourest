import {Component} from "react";
import {BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsGoogle} from "react-icons/bs"
import {Button, ButtonGroup, TextField} from "@mui/material";

const FooterList = ({header, descriptions}) => (
    <ul className="footer-list">
        <li key={header}>
            <p className="footer-list-title">{header}</p>
        </li>
        {descriptions.map((description) => (
            <li key={description}>
                <a href="#" className="footer-link">{description}</a>
            </li>
        ))}
    </ul>
)

export class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="footer-top">
                        <FooterList header={'Top destination'} descriptions={[
                            'Indonesia, Jakarta',
                            'Maldives, Malé',
                            'Australia, Canberra',
                            'Thailand, Bangkok',
                            'Morocco, Rabat']}/>

                        <FooterList header={'Categories'} descriptions={[
                            'Travel',
                            'Lifestyle',
                            'Fashion',
                            'Education',
                            'Food & Drink']}/>

                        <FooterList header={'Quick links'} descriptions={[
                            'About',
                            'Contact',
                            'Tours',
                            'Booking',
                            'Terms & Conditions']}/>

                        <div className="footer-list">
                            <p className="footer-list-title">Get a newsletter</p>
                            <p className="newsletter-text">
                                For the latest deals and tips, travel no further than your inbox
                            </p>
                            <ButtonGroup variant="outlined"
                                         aria-label="outlined button group" size="small">
                                <TextField id="outlined-basic"
                                           type={"email"}
                                           label="Email address"
                                           color={"info"}
                                           variant="standard"/>
                                <Button variant="contained">Subscribe</Button>
                            </ButtonGroup>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <a href="#" className="logo">Tourest</a>
                        <p className="copyright">
                            &copy; 2022 <a href="#" className="copyright-link">codewithsadee</a>. All Rights Reserved
                        </p>

                        <ul className="social-list">
                            <li className="social-link"><BsFacebook/></li>
                            <li className="social-link"><BsTwitter/></li>
                            <li className="social-link"><BsInstagram/></li>
                            <li className="social-link"><BsLinkedin/></li>
                            <li className="social-link"><BsGoogle/></li>
                        </ul>
                    </div>
                </div>
            </footer>
        )
    }
}