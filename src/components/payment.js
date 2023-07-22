import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "../styles/payment.css";
import { Card, Divider } from "antd";
import Scanner from "../assets/scanner.jpg";
import visa from "../assets/Visacart.png";
import mastercard from "../assets/Mastercardcart.png";
import { useLocation } from "react-router-dom";
import Navbarlogo from "./Navbarlogo";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { usdToBTC } from "../utils/helper";
import { CartContext } from "./CartContext";

const Payment = () => {
  const { cartItems, cartCount } = useContext(CartContext);

  const [btcRate, setBTCRate] = useState(null);
  const location = useLocation();
  const { email } = location?.state || {};
  const queryParams = new URLSearchParams(location.search);
  const input1 = queryParams.get("usdValue");
  const [usdValue, setUSDValue] = useState(input1);

  useEffect(() => {
    setUSDValue(usdValue);
  }, []);

  useEffect(() => {
    axios
      ?.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      )
      .then((response) => setBTCRate(response?.data?.bitcoin?.usd))
      .catch((error) => console.error(error));
  }, []);

  const totalCardsValue = cartItems?.reduce((accumulator, object) => {
    return (
      accumulator + Number(object.usdValue) * Number(object?.quantity || 1)
    );
  }, 0);

  const calculateTotalBTCExchangeFee = (totalCardValue) => {
    return (totalCardValue + cartCount * 2.98) / 100;
  };

  const subTotalUsdValue =
    totalCardsValue +
    cartCount * 2.98 +
    calculateTotalBTCExchangeFee(totalCardsValue);

  return (
    <>
      <Navbarlogo />
      <div className="checkout-main1">
        <div className="twocards1">
          <div className="payment-card1">
            <Card
              className="custom-card"
              title="Order Details"
              bordered={false}
            >
              <div className="order-details">
                <p>Email Address</p>
                <div className="email-div">
                  <p className="emailad">{email}</p>
                </div>
              </div>
              <div className="payment-details">
                <p>Payment Mode</p>
                <div className="email-div">
                  <p className="emailad">Bitcoin</p>
                </div>
              </div>
              <div className="payment-details">
                <p>Invoice Id</p>
                {/* TODO: Invoice ID should be generated on the server */}
                <div className="email-div">
                  <p className="emailad">{uuidv4()}</p>
                </div>
              </div>
              <Divider className="custom-divider" />
              {cartItems &&
                cartItems?.map((card) => (
                  <div className="custom-upper-para-pay">
                    <div>
                      <p className="swiggy">
                        <div className="value">
                          {card?.card === "1" ? (
                            <>
                              <div style={{ display: "flex" }}>
                                <img
                                  src={visa}
                                  alt="Visa"
                                  className="visacardtype-img1"
                                />
                                <p>Visa</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div style={{ display: "flex" }}>
                                <img
                                  src={mastercard}
                                  alt="MasterCard"
                                  className="cardtype-img1"
                                />
                                <p>MasterCard</p>
                              </div>
                            </>
                          )}
                        </div>
                      </p>
                      <div className="final-payment">
                        <p className="value">{`${card?.quantity || 1} x $${
                          card?.usdValue
                        }`}</p>
                        <p className="BTC-simplecard">{card?.btcValue} BTC</p>
                      </div>
                    </div>
                    <Divider className="custom-divider" />
                  </div>
                ))}
              <div>
                <p className="value">
                  Prepaid Card Purchase Price: {cartCount} x $2.98
                </p>
                <p className="value">
                  BTC Exchange Fee: $
                  {calculateTotalBTCExchangeFee(totalCardsValue)}
                </p>
              </div>
              <Divider className="custom-divider2" />
              <p className="subtotal">Total</p>
              <div className="custom-bottom-para pay-para">
                <p className="value">${subTotalUsdValue}</p>
                <p className="BTC-total">
                  {" "}
                  {usdToBTC(subTotalUsdValue, btcRate)} BTC
                </p>
              </div>
            </Card>
          </div>
          <div className="payment-card2">
            <Card
              className="Contact-title"
              title="Pay with Bitcoin"
              bordered={false}
              headStyle={{ borderBottom: "none" }}
            >
              <div className="scanner-pic">
                <img src={Scanner} alt="Scanner" />
              </div>
              <div className="pay-h">
                <p className="pay-h1">Payment details</p>
                <p className="pay-h2">Payment unique address</p>
                <p className="pay-h3">
                  bc1q9ng8y63sc55aw6wr4mwjjs9zcj2v0dqz6s0k2r
                </p>
              </div>
              <div className="pay-h">
                <p className="pay-h4">Amount to pay</p>
                <p className="value">
                  {usdToBTC(subTotalUsdValue, btcRate)} BTC
                </p>
              </div>
              <div>
                <p className="pay-h6">Expires in</p>
              </div>
              <div className="adv">
                <a href="#" className="pay-adv">
                  Advanced options
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
