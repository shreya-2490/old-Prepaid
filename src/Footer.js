import React from "react";
import "./footer.css";
import prepaidlogo from "./assets/logo.png"
import { Link } from 'react-router-dom';
import { UpCircleOutlined } from '@ant-design/icons';

function Footer() {

  return (
    <div className="footer">
      <p className="termscondition">Terms & Conditions <span className="divider-bet">|</span></p>
      <p className="privacy">Privacy Policy</p>
    </div>
  );
}

export default Footer;
