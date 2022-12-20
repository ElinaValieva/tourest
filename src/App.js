import './App.css';
import {Navbar} from "./components/Navbar";
import {Banner} from "./components/Banner";
import {Destination} from "./components/Destination";
import {About} from "./components/About";
import {Footer} from "./components/Footer";
import {Blog, Child} from "./components/Blog";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {NewTour} from "./components/NewTour";
import {createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material";
import {Tour} from "./components/Tour";

const theme = responsiveFontSizes(createTheme({
    palette: {
        primary: {
            main: 'hsl(180, 98%, 31%)'
        },
        info: {
            main: 'hsl(0, 0%, 100%)'
        }
    },
    typography: {
        htmlFontSize: 8,
        h1: {
            fontSize: 12,
            fontWeight: "bold",
            color: '#666'
        },
        h3: {
            fontSize: 10,
            color: '#9c9c9c'
        },
        h4: {
            fontSize: 26
        }
    },
}));

function App() {
    return (
        <ThemeProvider theme={theme}>
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
                                    <Blog limitCnt={3}/>
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
                                <Switch>
                                    <Route path="/:id" children={<Tour/>}></Route>
                                </Switch>
                            </Switch>
                        </article>
                    </main>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;