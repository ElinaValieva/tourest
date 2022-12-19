import './App.css';
import {Navbar} from "./components/Navbar";
import {Banner} from "./components/Banner";
import {Destination} from "./components/Destination";
import {About} from "./components/About";
import {Footer} from "./components/Footer";
import {Blog} from "./components/Blog";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {NewTour} from "./components/NewTour";
import {createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material";

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
        </ThemeProvider>
    );
}

export default App;