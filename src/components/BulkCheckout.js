import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Navbarlogo from "./Navbarlogo";
import "../styles/checkout.css";
import Payment from "./payment";
import validator from "validator";
import visa from "../assets/Visacartpage.png";
import mastercard from "../assets/Mastercardcartpage.png";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import axios from "axios";
import { usdToBTC } from "../utils/helper";

const BulkCheckout = () => {
  const [btcRate, setBTCRate] = useState(null);
  const navigate = useNavigate();
  const { bulkCartItems, removeBulkFromCart } = useContext(CartContext);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [paymentStatus, setPaymentstatus] = useState(false);
  const [email, setEmail] = useState("");

  const handleDelete = (cartItem) => {
    removeBulkFromCart(cartItem?.id);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  useEffect(() => {
    axios
      ?.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      )
      .then((response) => setBTCRate(response?.data?.bitcoin?.usd))
      .catch((error) => console.error(error));
  }, []);

  const totalCartValue = bulkCartItems?.reduce((accumulator, object) => {
    return accumulator + Number(object?.subTotal);
  }, 0);

  const handleSubmit = () => {
    setPaymentstatus(true);
    if (validator.isEmail(email)) {
      setEmail(email);
      // TODO: Replace some of the dummy values with the correct values
      axios
        ?.post(`/save-bulk-order-api`, {
          first_name: "Test first name",
          last_name: "Test last name",
          email: email,
          order_subtotal: totalCartValue,
          order_total: totalCartValue,
          payment_method: "btc",
          transaction_fee: "0.24",
          items: bulkCartItems?.map((cartItem) => ({
            cardType: cartItem?.cardType,
            quantity: cartItem?.quantity,
            amount: cartItem?.amount,
            maxTrans: 1,
            additional_transactions: cartItem?.additionalPurchaseQt
              ? true
              : false,
            additional_transactions_no: cartItem?.additionalPurchaseQt,
            additional_cost: 100,
            international_transaction:
              cartItem?.isUsedForInternationalTransaction ? true : false,
            international_cost: cartItem?.isUsedForInternationalTransaction,
            cost: 2.98,
            subtotal: totalCartValue,
          })),
        })
        .then((res) =>
          navigate(`/front-demo/payment`, {
            state: { email, orderType: "bulk-order" },
          })
        );
    } else {
      alert("Invalid email format. Please enter a correct email address.");
    }
  };

  return (
    <>
      <Navbarlogo />
      <div className="checkout-main">
        {!paymentStatus ? (
          <div className="twocards" style={{ overflowX: "hidden" }}>
            <div className="card1">
              <Card
                className="custom-card1"
                title="Order Summary"
                bordered={false}
                headStyle={{ borderBottom: "none" }}
              >
                <div className="custom-upper-para">
                  {bulkCartItems?.map((bulkCartItem) => {
                    const { id, quantity, amount, subTotal, cardType } =
                      bulkCartItem;

                    return (
                      <div key={id} className="item-container">
                        <div className="valuess">
                          <img
                            className="visa-mastercard-checkout"
                            src={cardType === "visa" ? visa : mastercard}
                            alt="Visa"
                          />
                          <div className="item-details">
                            <p className="valueheading">
                              {cardType === "visa" ? "Visa" : "MasterCard"}
                            </p>
                            <p className="value">
                              {quantity || 0} x ${amount || 0} = $
                              {subTotal || 0}
                            </p>
                          </div>
                          <div className="item-actions">
                            <div>
                              <DeleteOutlined
                                className="divider"
                                onClick={() => handleDelete(bulkCartItem)}
                              />
                            </div>
                            <p className="BTC">
                              {usdToBTC(subTotal, btcRate)} BTC
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="w-100 d-flex justify-content-between align-items-center">
                  <p className="custom-para">Total Estimate</p>
                  <p style={{ fontSize: "1.0625rem" }}>
                    {usdToBTC(totalCartValue, btcRate)} BTC
                  </p>
                </div>
              </Card>
            </div>
            <div className="card2">
              <Card
                className="Contact-title1"
                title="Contact Information"
                bordered={false}
                headStyle={{ borderBottom: "none" }}
              >
                <div>
                  <p className="email">
                    Email address for order status updates
                  </p>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="email-box"
                  ></input>
                </div>
                <div className="checkbox">
                  <Checkbox
                    style={{ marginRight: "10px" }}
                    checked={isChecked1}
                    onChange={handleCheckboxChange1}
                  />
                  <p>
                    Add me to the newsletter to receive news about new products
                    and features
                  </p>
                </div>
                <div className="checkbox">
                  <Checkbox
                    style={{ marginRight: "10px" }}
                    checked={isChecked2}
                    onChange={handleCheckboxChange2}
                  />
                  <p>
                    I have read and agree with the Prepaid Friends
                    <span className="terms">
                      <Link to="/front-demo/terms&conditions">
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link to="/front-demo/privacypolicy">
                        {" "}
                        Privacy Policy
                      </Link>
                    </span>
                  </p>
                </div>
                <div className="payment">
                  <Button
                    style={{
                      backgroundColor: isChecked2 ? "#FDC886" : "#FDC886",
                      color: isChecked2 ? "#1b1b1b" : "#1b1b1b",
                      marginBottom: "10px",
                    }}
                    className="payment-btn"
                    disabled={!isChecked2}
                    onClick={handleSubmit}
                  >
                    Continue to payment
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <Payment />
        )}
      </div>
    </>
  );
};

export default BulkCheckout;
