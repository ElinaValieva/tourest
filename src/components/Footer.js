import {Component} from "react";
import {BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsGoogle} from "react-icons/bs"

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
                            <form action="" className="newsletter-form">
                                <input type="email" name="email" required placeholder="Email address"
                                       className="newsletter-input"/>

                                <button type="submit" className="btn btn-primary">Subscribe</button>
                            </form>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <a href="#" className="logo">Tourest</a>
                        <p className="copyright">
                            &copy; 2022 <a href="#" className="copyright-link">codewithsadee</a>. All Rights Reserved
                        </p>

                        <ul className="social-list">
                            <li>
                                <a href="#" className="social-link"><BsFacebook/></a>
                            </li>

                            <li>
                                <a href="#" className="social-link"><BsTwitter/></a>
                            </li>

                            <li>
                                <a href="#" className="social-link"><BsInstagram/></a>
                            </li>

                            <li>
                                <a href="#" className="social-link"><BsLinkedin/></a>
                            </li>

                            <li>
                                <a href="#" className="social-link"><BsGoogle/></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        )
    }
}