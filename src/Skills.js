import React from "react";
import "./skills.css";
import simple from "./assets/simple.svg";
import fast from "./assets/fast.svg";
import flexible from "./assets/flexible.svg";

function Skills() {
  return (
    <div className="skills" id="skillss">
      <div className="skills-header">
        <h1 style={{ textAlign: "center", color: "white" }}>
        Why buy USDT with OKX?
        </h1>
      </div>
      <div className="skills-content">
         <figure className="content-imgs">
        <img src={simple}></img>
        <figcaption>
          <h4 className="simple-heading">Simple</h4>
          <span className="simple-content">OKX makes it easy to buy Cryptocurrency with a user-friendly interface</span>
        </figcaption>
         </figure>
         <figure className="content-imgs">
        <img src={fast}></img>
        <figcaption>
          <h4 className="simple-heading">Flexible</h4>
          <span className="simple-content">OKX offers a variety of payment methods and supports numerous local currencies to help users buy Tether</span>
        </figcaption>
         </figure>
         <figure className="content-imgs">
        <img src={flexible}></img>
        <figcaption>
          <h4 className="simple-heading">Fast</h4>
          <span className="simple-content">Get detailed information about cryptocurrencies listed on OKX, including their tech, founders and price history</span>
        </figcaption>
         </figure>
      </div>
    </div>
  );
}

export default Skills;
