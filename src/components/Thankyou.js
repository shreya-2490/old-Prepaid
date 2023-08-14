import React from "react";
import "../styles/Thankyou.css";
import Navbarlogo from "./Navbarlogo";
import checkmark from "../assets/Checkmark.png";
import { useLocation, useNavigate } from "react-router-dom";

export const Thankyou = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { orderNumber, email } = location?.state || {};

  const handleClickHome = () => {
    nav("/front-demo/");
  };
  return (
    <>
      <Navbarlogo customGoBack={() => nav("/front-demo")} />
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
                <p>{orderNumber}</p>
              </div>
              <div>
                <h3> Email Address :</h3>
                <p>{email}</p>
              </div>
              <div>
                <h3>Payment Method :</h3>
                <p> Bitcoin (BTC)</p>
              </div>
            </div>

            <div className="details">
              Thank You for our purchase. You will get all the important
              information into you provided email id. In case of any kind of
              issue, kindly contact with out support team from 10:00 AM to 5:00
              PM PST
            </div>
            <button className="account" onClick={handleClickHome}>
              Back to HomePage
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
