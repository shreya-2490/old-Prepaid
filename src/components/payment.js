import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "../styles/payment.css";
import { Card, Divider } from "antd";
import visa from "../assets/Visacartpage.png";
import mastercard from "../assets/Mastercardcartpage.png";
import { useLocation } from "react-router-dom";
import Navbarlogo from "./Navbarlogo";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { usdToBTC } from "../utils/helper";
import { CartContext } from "./CartContext";

const Payment = () => {
  const { cartItems, cartCount, preOwnedCards } = useContext(CartContext);

  const [btcRate, setBTCRate] = useState(null);
  const location = useLocation();
  const { email, orderType, data } = location?.state || {};
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
                  <p className="emailad">{data?.order_number || uuidv4()}</p>
                </div>
              </div>
              <Divider className="custom-divider" />
              {isBulkOrder ? (
                <>
                  {data?.objectDataReturn?.items?.map((item) => {
                    const { quantity, amount, subtotal, cardType } = item;

                    return (
                      <div className="custom-upper-para-pay">
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
                              {usdToBTC(subtotal, btcRate)} BTC
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="custom-bottom-para pay-para">
                    <p className="subtotal">Subtotal</p>
                    <p className="BTC-total">
                      ${data?.objectDataReturn?.order_subtotal}
                    </p>
                  </div>
                  <div>
                    <p>
                      Number of additional transactions per card:{" "}
                      {data?.objectDataReturn?.items[0]
                        ?.additional_transactions_no ?? 0}
                    </p>
                    <p>
                      International allowance fee:{" "}
                      {data?.objectDataReturn?.items[0]?.international_cost ??
                        0}
                    </p>
                    <p>
                      Prepaid card purchase price:{" "}
                      {data?.objectDataReturn?.items[0]?.quantity}x $
                      {data?.objectDataReturn?.items[0]?.cost}
                    </p>
                    <p>
                      BTC exchange fee: $
                      {data?.objectDataReturn?.transaction_fee ?? 0}
                    </p>
                  </div>

                  <p className="subtotal">Total</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">
                      {" "}
                      {data?.objectDataReturn?.order_total}
                    </p>
                    <p className="BTC-total">
                      {usdToBTC(
                        data?.objectDataReturn?.order_total ?? 0,
                        btcRate
                      )}{" "}
                      BTC
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
                  {preOwnedCards &&
                    preOwnedCards?.map((preOwnedCard) => (
                      <div className="custom-upper-para-pay">
                        <div className="value2">
                          <div>
                            <img
                              src={
                                preOwnedCard?.type === "visa"
                                  ? visa
                                  : mastercard
                              }
                              alt={
                                preOwnedCard?.type === "visa"
                                  ? "Visa"
                                  : "Mastercard"
                              }
                              className="visacardtype-img1"
                            />

                            <div className="nayasa">
                              <p className="order-detail-para">
                                {preOwnedCard?.type === "visa"
                                  ? "Visa"
                                  : "Mastercard"}
                              </p>
                              <p>{`1 x $${preOwnedCard?.price}`}</p>
                            </div>
                          </div>
                        </div>
                        <div className="final-payment">
                          <p className="BTC-simplecard">
                            {usdToBTC(preOwnedCard?.price, btcRate)} BTC
                          </p>
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
            <div dangerouslySetInnerHTML={{ __html: data?.btc_qr_code }} />
            {/* <Card
              className="Contact-title"
              title="Pay with Bitcoin"
              bordered={false}
              headStyle={{ borderBottom: "none" }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: paymentInfo?.btc_qr_code }}
              />
              {/* <QRCode value={paymentInfo?.btc_qr_code || "-"} /> */}
            {/* <div className="scanner-pic">
                <img src={Scanner} alt="Scanner" />
              </div> */}
            {/* <div className="pay-h">
                <p className="pay-h1">Payment details</p>
                <p className="pay-h2">Payment unique address</p>
                <p className="pay-h3">{paymentInfo?.bitcon_address || ""}</p>
              </div>
              <div className="pay-h">
                <p className="pay-h4">Amount to pay</p>
                <p className="value">{paymentInfo?.btc_amount || ""} BTC</p>
              </div>
              <div>
                <p className="pay-h6">Expires in</p>
              </div>
              <div className="adv">
                <a href="#" className="pay-adv">
                  Advanced options
                </a>
              </div>
            </Card> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
