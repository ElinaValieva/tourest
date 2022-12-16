import './App.css';
import {Header} from "./components/Header";
import {Banner} from "./components/Banner";
import {Destination} from "./components/Destination";
import {About} from "./components/About";
import {Footer} from "./components/Footer";
import {Blog} from "./components/Blog";

function App() {
    return (
        <div className="App">
            <Header/>
            <main>
                <article>
                    <Banner/>
                    <Destination/>
                    <About/>
                    <Blog/>
                    <Footer/>
                </article>
            </main>
        </div>
    );
}

export default App;
