import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "../styles/payment.css";
import { Card, Divider } from "antd";
import Scanner from "../assets/scanner.jpg";
import visa from "../assets/Visacartpage.png";
import mastercard from "../assets/Mastercardcartpage.png";
import { useLocation } from "react-router-dom";
import Navbarlogo from "./Navbarlogo";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { usdToBTC } from "../utils/helper";
import { CartContext } from "./CartContext";

const Payment = () => {
  const { cartItems, cartCount, bulkCartItems } = useContext(CartContext);

  const [btcRate, setBTCRate] = useState(null);
  const location = useLocation();
  const { email, orderType } = location?.state || {};
  const queryParams = new URLSearchParams(location.search);
  const input1 = queryParams.get("usdValue");
  const [usdValue, setUSDValue] = useState(input1);
  const isBulkOrder = orderType === "bulk-order";

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

  const totalBulkCartAmount = bulkCartItems?.reduce((accumulator, object) => {
    return accumulator + Number(object?.amount) * Number(object?.quantity);
  }, 0);

  return (
    <>
      <Navbarlogo />
      <div className="checkout-main1">
        <div className="twocards1">
          <div className="payment-card1">
            <Card
              className="custom-card"
              title="Order Details"
              style={{ borderBottom: "none" }}
            >
              <div className="order-details">
                <p className="order-detail-para">Email Address</p>
                <div className="email-div">
                  <p className="emailad">{email}</p>
                </div>
              </div>
              <div className="payment-details">
                <p className="order-detail-para">Payment Mode</p>
                <div className="email-div">
                  <p className="emailad">Bitcoin</p>
                </div>
              </div>
              <div className="invoice-details">
                <p className="order-detail-para">Invoice Id</p>
                <div className="email-div">
                  <p className="emailad">{uuidv4()}</p>
                </div>
              </div>
              <Divider className="custom-divider" />
              {isBulkOrder ? (
                <>
                  {bulkCartItems?.map((bulkCartItem) => {
                    const { id, quantity, amount, subTotal, cardType } =
                      bulkCartItem;

                    return (
                      <div key={id} className="custom-upper-para-pay">
                        <div className="value2">
                          <img
                            className="visacardtype-img1"
                            src={cardType === "visa" ? visa : mastercard}
                            alt="Visa"
                          />
                          <div className="nayasa">
                            <p className="order-detail-para">
                              {cardType === "visa" ? "Visa" : "MasterCard"}
                            </p>
                            <p>
                              {quantity || 0} x ${amount || 0}
                            </p>
                          </div>
                          <div className="item-actions">
                            <p className="BTC">
                              {usdToBTC(subTotal, btcRate)} BTC
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                   <div className="custom-bottom-para pay-para">
                    <p className="subtotal">Subtotal</p>
                    <p className="BTC-total">${totalBulkCartAmount}</p>
                  </div>
                  <div>
                    <p>
                      Number of additional transactions per card:{" "}
                      {bulkCartItems[0]?.additionalPurchaseQt || "$0"}
                    </p>
                    <p>
                      International allowance fee:{" "}
                      {bulkCartItems[0]?.isUsedForInternationalTransaction
                        ? "$7.5"
                        : "$0"}
                    </p>
                    <p>
                      Prepaid card purchase price: {bulkCartItems[0]?.quantity}{" "}
                      x 2.98
                    </p>
                    <p>BTC exchange fee: $25.00</p>
                  </div>
                  
                  <p className="subtotal">Total</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="BTC-total">
                      {bulkCartItems[0]?.subTotal + 25}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {cartItems &&
                    cartItems?.map((card) => (
                      <div className="custom-upper-para-pay">
                        <div className="value2">
                          {card?.card === "1" ? (
                            <>
                              <div>
                                <img
                                  src={visa}
                                  alt="Visa"
                                  className="visacardtype-img1"
                                />

                                <div className="nayasa">
                                  <p className="order-detail-para">Visa</p>
                                  <p>{`${card?.quantity || 1} x $${
                                    card?.usdValue
                                  }`}</p>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <img
                                  src={mastercard}
                                  alt="MasterCard"
                                  className="cardtype-img1"
                                />

                                <div className="nayasa">
                                  <p className="order-detail-para">
                                    MasterCard
                                  </p>
                                  <p>{`${card?.quantity || 1} x $${
                                    card?.usdValue
                                  }`}</p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="final-payment">
                          <p className="BTC-simplecard">{card?.btcValue} BTC</p>
                        </div>
                      </div>
                    ))}
                  <div className="final-pay">
                    <p>Prepaid Card Purchase Price: {cartCount} x $2.98</p>
                    <p>
                      BTC Exchange Fee: $
                      {calculateTotalBTCExchangeFee(totalCardsValue)}
                    </p>
                  </div>

                  <p className="subtotal">Total</p>
                  <div className="custom-bottom-para pay-para">
                    <p>${subTotalUsdValue}</p>
                    <p className="BTC-total">
                      {" "}
                      {usdToBTC(subTotalUsdValue, btcRate)} BTC
                    </p>
                  </div>
                </>
              )}
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
