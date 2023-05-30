import React from "react";
import "./footer.css";
import loc from "./assets/location.png";
import phone from "./assets/phone.png";
import email from "./assets/email.png";

function Footer() {
  return (
    <div className="footerr">
      <div className="footer">
        <div className="left">
          <h3>Shreya</h3>
          <p>
            Thank you for visiting my website. I hope you liked it.Connect
            with me over socials{" "}
          </p>
        </div>
        <div className="right">
          <h3>Contact Info</h3>
          <div>
            <img src={phone}></img>
            <span>+91 8930400577</span>
          </div>
          <div>
            <img src={email}></img>
            <span>s07hreya@gmail.com</span>
          </div>
          <div>
            <img src={loc}></img>
            <span>Yamuna Nagar, Haryana, India</span>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid gray" }}></div>
      <h5
        style={{
          color: "white",
          textAlign: "center",
          margin: "0",
          marginTop: "5px",
        }}
      >
        Made by Shreya Garg
      </h5>
    </div>
  );
}

export default Footer;
