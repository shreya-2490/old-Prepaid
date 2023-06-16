import React from "react"
import { useState, useEffect } from "react"
import "./payment.css"
import { Card, Button, Tooltip, Select, Space, Divider, Checkbox } from "antd"
import { InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons"
import Scanner from "../assets/scanner.jpg"
import { useLocation } from "react-router-dom"

const Payment = ({ email }) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const input1 = queryParams.get("usdValue")
  const input2 = queryParams.get("btcValue")
  const [usdValue, setUSDValue] = useState(input1)
  const [btcValue, setBtcValue] = useState(input2)

  useEffect(() => {
    setUSDValue(usdValue)
    setBtcValue(btcValue)
  }, [])
  return (
    <div className="checkout-main">
      <div className="twocards" style={{ overflowX: "hidden" }}>
        <div className="payment-card1">
          <Card
            className="custom-card"
            title="Order Summary"
            bordered={false}
            style={{ width: 500, margin: "90px 0px 0px 30px" }}
            headStyle={{ borderBottom: "none" }}
          >
            <div className="order-details">
              <p>Email Address</p>
              <div className="email-div">
                <p className="emailad">{email}</p>
                <a href="" className="change">
                  Change
                </a>
              </div>
            </div>
            <div className="payment-details">
              <p>Payment Mode</p>
              <div className="email-div">
                <p className="emailad">Bitcoin</p>
                <a href="" className="change">
                  Change
                </a>
              </div>
            </div>
            <Divider className="custom-divider" />
            <div className="custom-upper-para">
              <div>
                <p className="swiggy">Mastercard</p>
                <p className="value">${usdValue}</p>
              </div>
              <div className="se-box">
                <p className="BTC">{btcValue} BTC</p>
              </div>
            </div>
            <Divider className="custom-divider2" />
            <div className="custom-bottom-para pay-para">
              <p className="custom-para">Total</p>
              <p className="BTC">{btcValue} BTC</p>
            </div>
          </Card>
        </div>
        <div className="card2">
          <Card
            className="Contact-title"
            title="Pay with Bitcoin"
            bordered={false}
            headStyle={{ borderBottom: "none" }}
            style={{
              width: "638px",
              height: 800,
              margin: "90px 0px 0px 30px",
            }}
          >
            <div className="scanner-pic">
              <img src={Scanner}></img>
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
              <p className="pay-h5">{btcValue } BTC</p>
            </div>
            <div>
              <p className="pay-h6">Expires in</p>
            </div>
            <div className="adv">
              <a href="" className="pay-adv">
                Advanced options
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default Payment
