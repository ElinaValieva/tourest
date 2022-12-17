import './App.css';
import {Navbar} from "./components/Navbar";
import {Banner} from "./components/Banner";
import {Destination} from "./components/Destination";
import {About} from "./components/About";
import {Footer} from "./components/Footer";
import {Blog} from "./components/Blog";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {NewTour} from "./components/NewTour";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <main>
                    <article>
                        <Switch>
                            <Route exact path="/">
                                <Banner/>
                                <Destination/>
                                <About/>
                                <Blog/>
                                <Footer/>
                            </Route>
                            <Route path="/destination">
                                <Destination/>
                            </Route>
                            <Route path="/blog">
                                <Blog/>
                            </Route>
                            <Route path="/about">
                                <About/>
                            </Route>
                            <Route path="/new">
                                <NewTour/>
                            </Route>
                        </Switch>
                    </article>
                </main>
            </div>
        </BrowserRouter>
    )
        ;
}

export default App;
