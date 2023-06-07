import React from "react"
import { useState, useRef } from "react"
import { Card, Button, Tooltip, Select, Space, Divider, Checkbox } from "antd"
import { InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons"
import Navbar from "../navbar"
import "./checkout.css"
import Payment from "./payment"
import validator from 'validator';

const Checkout = () => {
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)
  const [paymentStatus, setPaymentstatus] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleSubmit = () => {

    setPaymentstatus(true)
    if (validator.isEmail(email)) {
      setEmail(email)
    } else {
      alert('Invalid email format. Please enter a correct email address.');
    }
  }

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1)
  }

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2)
  }
  const tooltipText = "This is the text that will be displayed on hover."

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  return (
    <>
      <Navbar />
      <div className="checkout-main">
        {!paymentStatus ? (
          <div className="twocards" style={{ overflowX: "hidden" }}>
            <div className="card1">
              <Card
                className="custom-card"
                title="Order Summary"
                bordered={false}
                style={{ width: 500, margin: "90px 0px 0px 30px" }}
                headStyle={{ borderBottom: "none" }}
              >
                <div className="custom-upper-para">
                  <div>
                    <p className="swiggy">Swiggy Money India</p>
                    <p className="value">₹1000.00 value</p>
                  </div>
                  <div className="se-box">
                    <div className="select-box">
                      <Space wrap>
                        <Select
                          className="select"
                          defaultValue="1"
                          style={{ width: 54 }}
                          onChange={handleChange}
                          options={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                            { value: "5", label: "5" },
                            { value: "6", label: "6" },
                            { value: "7", label: "7" },
                            { value: "8", label: "8" },
                          ]}
                        />
                      </Space>
                      <DeleteOutlined />
                    </div>
                    <p className="BTC">0.00047920 BTC</p>
                  </div>
                </div>
                <Divider />
                <a href="" className="custom-link">
                  Enter a Promo Code
                </a>
                <div className="custom-bottom-para">
                  <div className="custom-tooltip">
                    <p className="custom-para">Total Estimate</p>
                    <Tooltip title={tooltipText}>
                      <InfoCircleOutlined />
                    </Tooltip>
                  </div>
                  <p className="BTC">0.00047920 BTC</p>
                </div>
              </Card>
            </div>
            <div className="card2">
              <Card
                className="Contact-title"
                title="Contact Information"
                bordered={false}
                headStyle={{ borderBottom: "none" }}
                style={{
                  width: "638px",
                  height: 430,
                  margin: "90px 0px 0px 30px",
                }}
              >
                <p className="custom-para2">
                  Already have an account?
                  <a href="" className="custom-link">
                    Login
                  </a>
                </p>
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
                    I have read and agree with the Bitrefill
                    <a href="" className="terms">
                      Terms & Conditions and the Privacy Policy
                    </a>
                  </p>
                </div>
                <div className="payment">
                  <Button
                    style={{
                      backgroundColor: isChecked2
                        ? "orangered"
                        : "rgb(223, 60, 1)",
                      color: isChecked2 ? "white" : "whitesmoke",
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
          <Payment email={email} />
        )}
      </div>
    </>
  )
}

export default Checkout
