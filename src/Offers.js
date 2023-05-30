import React from "react";
import "./offers.css";
import cards from "./assets/cards.svg"

function Offers() {
  return (
    <div>
     <section className="main">
      <div className="side-div">
        <div style={{display:"block"}}>
          <h4 className="heading">What can I do after I buy USDT?</h4>
        </div>    
     <div>
     <div className="content">
      <div className="side-content">
       <p>OKX supports a host of stablecoins, including USDT,
        and has hundreds of crypto assets paired against it. Additionally,
         buying USDT on OKX gives you access to hundreds of digital assets listed for trading,
         including BTC and ETH.
        </p><br/>
        <p>
        Your purchased USDT tokens will be deposited in your account almost instantly after completing your order.
         You can then use USDT to trade and buy other digital assets or earn passive income with the OKX Earn program.
        </p><br/>
        <p>
        Buying USDT on OKX is a secure and intuitive process on both the app and web interfaces. 
        Users benefit from our industry-leading security protocols that ensure the safety of funds.
        </p><br/>
        <p>
        OKX also supports buying USDT through major payment methods such as VISA,
         MasterCard, ApplePay credit cards, bank transfers, and more.
        </p><br/>
        <p>
        USDT holders can start earning passive income with their tokens on OKX Earn. 
        This service has varying offers with fixed and flexible terms and attractive APYs. 
        USDT holders can also pay or receive remittance instantly in USDT or HODL their USDT tokens and 
        use it as a hedge against crypto volatility.
        </p><br/>
        <p>
        OKX’s industry-leading trading and P2P offerings help you buy USDT easily with 
        flexible payment methods. Access popular USDT trading pairs by signing up for an OKX account.
        </p><br/>
      </div>
      </div>
     </div>
     </div>
     <div className="card-img">
      <img src={cards}></img>
     </div>
     </section>
    </div>
  );
}

export default Offers;
