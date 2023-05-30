import React from "react";
import "./about.css";
import Usdt from "./assets/img.webp";
import okx from "./assets/img2.png"

function About() {
  return (
    <div className="main">
    <div className="about" id="aboutt">
      <div className="about-header">
        <img src={Usdt}></img>
        <h1>
        What is USDT
        </h1>
      </div>
      <div className="about-content">
        <p>
        Initially called Realcoin, Tether (USDT) was launched in 2014 by Brock Pierce, Reeve Collins, and Craig Sellars.
         USDT is an Ethereum-based stablecoin that is supposed to be pegged and backed to the U.S. dollar.
        </p><br/>
        <p>
        USDT tokens enable users to transact with fiat-like stability in the volatile crypto market.
         Users can buy USDT and sell or trade cryptocurrencies using it without worrying about the price fluctuations of a typical crypto asset.
        </p><br/>
        <p>
        Furthermore, USDT is a multi-blockchain asset. It is available on leading blockchains like Ethereum, Solana, Tron, Algorand, Avalanche, 
        Bitcoin Cash’s Simple Ledger Protocol (SLP), EOS, Liquid Network, Omni, and more.
        </p><br/>
        <p>
        USDT's price stability mechanism makes it a popular stablecoin choice among crypto traders who have a convenient way to conduct digital transactions 
        without the worry of price and value fluctuations. All major cryptocurrencies have trading pairs with USDT. 
        Therefore, you can access high liquidity transactions if you buy USDT.
        </p>
      </div>
      </div>
      <div className="about-sider">
        <img src={okx}></img>
      </div>
    </div>
  );
}

export default About;
