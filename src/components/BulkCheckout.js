import React, { useState, useEffect, useContext } from "react"
import { Card, Button, Checkbox, Radio, Space } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import Navbarlogo from "./Navbarlogo"
import "../styles/checkout.css"
import validator from "validator"
import visa from "../assets/Visacartpage.png"
import mastercard from "../assets/Mastercardcartpage.png"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { CartContext } from "./CartContext"
import axios from "axios"
import { usdToBTC } from "../utils/helper"
import btc from "../assets/btc.png"
import wiretransfer from "../assets/wiretransfer.png"
import { AuthContext } from "../context/auth-context"
import { useCookies } from "react-cookie"

const BulkCheckout = () => {
  const [btcRate, setBTCRate] = useState(null)
  const navigate = useNavigate()
  const { state } = useLocation()
  const [cookies] = useCookies(["pfAuthToken"])
  const { user } = useContext(AuthContext)
  const { bulkCartItems, removeBulkFromCart } = useContext(CartContext)
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)
  const [email, setEmail] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [paymentTypeSelectionOpen, setPaymentTypeSelectionOpen] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)

  const handleDelete = (cartItem) => {
    removeBulkFromCart(cartItem?.id)
  }

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1)
  }

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2)
  }

  const handleEmailChange = (event) => {
    const enteredEmail = event.target.value
    setEmail(enteredEmail)
    setIsEmailValid(validator.isEmail(enteredEmail))
  }

  useEffect(() => {
    axios
      ?.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      )
      .then((response) => setBTCRate(response?.data?.bitcoin?.usd))
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    if (user?.email) {
      setPaymentTypeSelectionOpen(true)
    }
  }, [])

  const totalCartValue = bulkCartItems?.reduce((accumulator, object) => {
    return accumulator + Number(object?.subTotal)
  }, 0)

  const showBitcoinPayment = totalCartValue >= 500

  const handleSubmit = () => {
    if (user?.email) {
      setIsLoading(true)
      axios
        ?.post(
          `/api/save-bulk-order-api`,
          {
            customer_name: state?.customerName,
            address: state?.address,
            phone_no: state?.phoneNumber,
            broker_id: state?.brokerId,
            business_name: state?.businessName,
            email: user?.email,
            payment_method: paymentMethod,
            guest: false,
            items: bulkCartItems?.map((cartItem) => ({
              cardType: cartItem?.cardType === "visa" ? "Visa" : "masterCard",
              quantity: cartItem?.quantity,
              amount: cartItem?.amount,
              additional_transactions: cartItem?.additionalPurchaseQt
                ? true
                : false,
              additional_transactions_no: cartItem?.additionalPurchaseQt,
              international_transaction:
                cartItem?.isUsedForInternationalTransaction ? true : false,
            })),
          },
          {
            headers: { Authorization: `Bearer ${cookies?.pfAuthToken}` },
          }
        )
        .then((res) =>
          navigate(`/payment`, {
            state: {
              email: user?.email,
              orderType: "bulk-order",
              data: res?.data,
            },
          })
        )
        ?.finally(() => setIsLoading(false))
    } else {
      if (validator.isEmail(email)) {
        setEmail(email)
        setIsLoading(true)
        axios
          ?.post(`/api/save-bulk-order-api`, {
            customer_name: state?.customerName,
            address: state?.address,
            phone_no: state?.phoneNumber,
            broker_id: state?.brokerId,
            business_name: state?.businessName,
            email: email,
            payment_method: paymentMethod,
            guest: true,
            items: bulkCartItems?.map((cartItem) => ({
              cardType: cartItem?.cardType === "visa" ? "Visa" : "masterCard",
              quantity: cartItem?.quantity,
              amount: cartItem?.amount,
              additional_transactions: cartItem?.additionalPurchaseQt
                ? true
                : false,
              additional_transactions_no: cartItem?.additionalPurchaseQt,
              international_transaction:
                cartItem?.isUsedForInternationalTransaction ? true : false,
            })),
          })
          .then((res) =>
            navigate(`/payment`, {
              state: { email, orderType: "bulk-order", data: res?.data },
            })
          )
          ?.finally(() => setIsLoading(false))
      } else {
        alert("Invalid email format. Please enter a correct email address.")
      }
    }
  }

  return (
    <>
      <Navbarlogo />
      <div className="checkout-main">
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
                    bulkCartItem

                  return (
                    <div key={id} className="item-container">
                      <div className="valuess">
                        <div className="valuessinner">
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
                  )
                })}
              </div>

              <div className="custom-bottom-para-total">
                <p className="custom-para">Total Estimate</p>
                <div className="custom-upper-cardvalue">
                  <p className="value123">${totalCartValue}</p>
                  <p className="BTC-total">
                    {usdToBTC(totalCartValue, btcRate)} BTC
                  </p>
                </div>
              </div>
            </Card>
          </div>
          <div className="card2">
            <Card
              className="Contact-title1"
              title={
                paymentTypeSelectionOpen
                  ? "Select Payment Type"
                  : "Contact Information"
              }
              bordered={false}
              headStyle={{ borderBottom: "none" }}
            >
              {paymentTypeSelectionOpen ? (
                <>
                  <div
                    className={`rectangle-parent ${
                      !showBitcoinPayment ? "" : "with-bitcoin"
                    }`}
                  >
                    {!showBitcoinPayment && (
                      <div
                        style={{
                          backgroundColor:
                            paymentMethod === "btc" ? "#FDC886" : "",
                        }}
                        className={`frame-item ${
                          paymentMethod === "btc" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setPaymentMethod("btc")
                        }}
                      ></div>
                    )}
                    <div
                      className={`frame-inner ${
                        paymentMethod === "wire" ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor:
                          paymentMethod === "wire" ? "#FDC886" : "",
                      }}
                      onClick={() => {
                        setPaymentMethod("wire")
                      }}
                    ></div>
                    <div
                      className="group-container"
                      onClick={() => {
                        setPaymentMethod("wire")
                      }}
                    >
                      <div class="wire-transfer-wrapper">
                        <div class="wire-transfer">Wire Transfer</div>
                      </div>
                      <img
                        class="bank-building-icon"
                        alt=""
                        src={wiretransfer}
                      />
                    </div>
                    {!showBitcoinPayment && (
                      <div
                        className="group-container1"
                        onClick={() => {
                          setPaymentMethod("btc")
                        }}
                      >
                        <div class="bitcoin">Bitcoin</div>
                        <img class="bitcoin-icon" alt="" src={btc} />
                      </div>
                    )}
                  </div>
                  <div className="payment">
                    <Button
                      style={{
                        backgroundColor: isChecked2 ? "#FDC886" : "#FDC886",
                        color: isChecked2 ? "#1b1b1b" : "#1b1b1b",
                        marginBottom: "10px",
                      }}
                      className="payment-btn"
                      disabled={
                        !(paymentMethod === "wire" || paymentMethod === "btc")
                      }
                      loading={isLoading}
                      onClick={handleSubmit}
                    >
                      Continue to payment
                    </Button>
                  </div>
                </>
              ) : (
                <>
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
                      Add me to the newsletter to receive news about new
                      products and features
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
                        <Link to="/terms&conditions">Terms & Conditions</Link>{" "}
                        and <Link to="/privacypolicy"> Privacy Policy</Link>
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
                      disabled={!isChecked2 || !isEmailValid}
                      onClick={() => setPaymentTypeSelectionOpen(true)}
                    >
                      Choose Payment Type
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default BulkCheckout
