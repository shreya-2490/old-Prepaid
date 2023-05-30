import "./App.css";
import Home from "./Home";
import About from "./AboutUsdt";
import Skills from "./Skills";
import Offers from "./Offers";
import Projects from "./Projects";
import Experience from "./Experience";
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
      <Experience />
      <Footer />
    </div>
  );
}

export default App;
