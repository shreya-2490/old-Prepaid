import React from "react";
import "../styles/Thankyou.css"
import Navbarlogo from "./Navbarlogo";
import checkmark from "../assets/Checkmark.png"
import truck from "../assets/Delivery.png" 
import brake from "../assets/Brake Warning.png"

export const Thankyou = () => {
    return (

        <>
           <Navbarlogo />
          <section className="full-page">
            <div className="thankyou">
                <div className="thankyou-inner">
                  <div className="circle">
                      <img src={checkmark} alt="checkmark" />
                      <h1>Thank You for your purchase!</h1>
                  </div>

                  <div className="order">

                        <div>
                            <h3> Order No :</h3>
                            <p> OD49937JKKD4690</p>
                        </div>
                        <div>
                        <h3> Email Address :</h3>
                            <p> arpan@digitallydrunk.com</p>
                        </div>
                        <div>
                        <h3>Payment Method :</h3>
                            <p> Bitcoin (BTC)</p>
                        </div>

                  </div>

                  <div className="details">
                  Thank You for our purchase. You will get all the important information 
                  into you provided email id. In case of any kind of issue, kindly contact with
                   out support team from 10:00 AM to 5:00 PM PST
                  </div>

                  <div className="truck">
                    <img src={truck} alt="truck" />
                    <h3>Estimated Delivery Date :</h3>
                    <p>
                    You can expect your order will delivered within 5 working days (except holidays)
                    </p>
                  </div>

                  <div className="redirect">
                    <img src={brake} alt="brake" />
                    <h3>
                    Redirect to the homepage in 10 seconds ...
                    </h3>
                  </div>

                   <button className="account">My Account</button>
                  </div>
            </div>
          </section>
        </>
    )
}

