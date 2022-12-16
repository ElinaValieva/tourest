import {Component} from "react";

const BlogCard = ({cards}) => (
    <ul className="blog-list">
        {cards.map((card) => (
        <li>
            <div className="blog-card">
                <figure className="card-banner">
                    <a href="#">
                        <img src={card.source} width="740" height="518" loading="lazy"
                             alt="A good traveler has no fixed plans and is not intent on arriving."
                             className="img-cover"/>
                    </a>
                    <span className="card-badge">
                        <ion-icon name="time-outline"></ion-icon>
                        <time dateTime="12-04">{card.publishedDay}</time>
                    </span>
                </figure>

                <div className="card-content">
                    <div className="card-wrapper">
                        <div className="author-wrapper">
                            <figure className="author-avatar">
                                <img src={card.avatar} width="30" height="30"
                                     alt={card.author}/>
                            </figure>
                            <div>
                                <a href="#" className="author-name">{card.author}</a>
                                <p className="author-title">{card.surname}</p>
                            </div>
                        </div>
                        <time className="publish-time" dateTime="10:30">{card.publishedTime}</time>
                    </div>

                    <h3 className="card-title">
                        <a href="#">{card.title}</a>
                    </h3>

                    <a href="#" className="btn-link">
                        <span>Read More</span>
                        <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
                    </a>
                </div>
            </div>
        </li>
        ))}
    </ul>
)

const popularCards = [
    {
        source: '/assets/images/popular-1.jpeg',
        publishedDay: '04 Dec',
        publishedTime: '10:30 AM',
        avatar: '/assets/images/author-avatar.png',
        author: 'Jony bristow',
        surname: 'Admin',
        title: 'A good traveler has no fixed plans and is not intent on arriving.'
    },
    {
        source: '/assets/images/popular-2.jpeg',
        publishedDay: '05 Dec',
        publishedTime: '10:35 AM',
        avatar: '/assets/images/author-avatar.png',
        author: 'Jony bristow',
        surname: 'Admin',
        title: 'A good traveler has no fixed plans and is not intent on arriving.'
    },
    {
        source: '/assets/images/popular-3.jpeg',
        publishedDay: '04 Dec',
        publishedTime: '12:30 AM',
        avatar: '/assets/images/author-avatar.png',
        author: 'Jony bristow',
        surname: 'Admin',
        title: 'A good traveler has no fixed plans and is not intent on arriving.'
    }
]
export class Blog extends Component {
    render() {
        return (
            <section className="section blog">
                <div className="container">
                    <p className="section-subtitle">From The Blog Post</p>
                    <h2 className="h2 section-title">Latest News & Articles</h2>
                    <BlogCard cards={popularCards}/>
                </div>
            </section>
        )
    }
}