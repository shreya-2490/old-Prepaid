import "./App.css";
import Home from "./Home";
import About from "./AboutUsdt";
import Skills from "./Skills";
import Offers from "./Offers";
import Projects from "./Projects";
import Faq from "./Faq";
import Footer from "./Footer";
import Navbar from "./navbar";

function App() {

  return (
    <div className="App">
      <Navbar/>
      <Home/>
      <About/>
      <Skills />
      <Offers />
      <Projects />
      <Faq />
      <Footer />
    </div>
  );
}

export default App;
