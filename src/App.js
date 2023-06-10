import React, { useRef } from 'react';
import "./App.css";
import { BrowserRouter as Router, Switch, Routes, Route, Link, Redirect } from 'react-router-dom';
import Home from "./Home";
import About from "./AboutUsdt";
import BulkCard from "./BulkCard";
import Offers from "./Offers";
import Projects from "./Projects";
import Faq from "./Faq";
import Footer from "./Footer";
import Navbar from "./navbar";
import Checkout from "./components/Checkout";
import Login from './components/Login';


function App() {

  return (
    <div className="App">
       <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      <Routes>
        <Route path="/" element={<About />} />
      </Routes>
      <Routes>
        <Route path="/" element={<BulkCard />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Offers />} />
      </Routes>
      <Routes>     
        <Route path="/" element={<Projects />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Faq/>}/>
      </Routes>
      <Routes>
            <Route path="/" element={<Footer />} />
      </Routes>
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Routes>
        <Route path="/login" element={<Login/>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
