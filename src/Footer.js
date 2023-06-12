import React,{useRef} from "react";
import "./footer.css";
import prepaidlogo from "./assets/logo.png"
import { Link } from 'react-router-dom';
import { UpCircleOutlined } from '@ant-design/icons';

function Footer() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="footer">
      <div className="prepaid-logo"><img src={prepaidlogo}></img></div>
      <Link to="/" className="arrowhead" onClick={scrollToTop}><UpCircleOutlined /></Link>
    </div>
  );
}

export default Footer;
