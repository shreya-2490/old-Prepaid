import React from "react"
import { useState, useRef } from "react"
import { Card, Select } from "antd"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

import Navbar from "./navbar"
import mastercard from "./assets/mastercard.jpg"
import "./CartPage.css"

const Cart = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const usdValue = queryParams.get("usd")
  // const btcAmount = handleUSDChange(usdValue);
  const btcRate = 0.00001; // Conversion rate from USD to BTC

  const handlebtcChange = (value) => {
    const [min, max] = value.split('-');
    const btcMin = min * btcRate;
    const btcMax = max * btcRate;
  }
  const options = [
    { value: "100-500", label: "100-500" },
    { value: "500-1000", label: "500-1000" },
    { value: "1000-1500", label: "1000-1500" },
    { value: "1500-2000", label: "1500-2000" },
    { value: "2000-2500", label: "2000-2500" },
    { value: "2500-3000", label: "2500-3000" },
    { value: "3000-3500", label: "3000-3500" },
    { value: "3500-4000", label: "3500-4000" },
    { value: "4000-4500", label: "4000-4500" },
    { value: "4500-5000", label: "4500-5000" },
  ]

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  return (
    <>
      <Navbar />
      <div className="cart-main">
        <div className="twocards-cart" style={{ overflowX: "hidden" }}>
          <div className="card1-cart">
            <Card
              className="custom-card-cart"
              title=""
              bordered={false}
              style={{
                width: 500,
                height: 300,
                borderRadius: "20px",
                margin: "90px 0px 0px 30px",
              }}
              headStyle={{ borderBottom: "none" }}
            >
              <img src={mastercard}></img>
            </Card>
          </div>
          <div className="card2-cart">
            <Card
              className="Contact-title"
              title="NEW PREPAID MASTERCARD"
              bordered={false}
              headStyle={{ borderBottom: "none" }}
              style={{
                width: "638px",
                height: "410px",
                margin: "90px 0px 0px 30px",
              }}
            >
              <p className="custom-para2-cart">content to be ready for this</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  margin: "20px 20px",
                }}
              >
                <div style={{ marginTop: "50px" }}>
                  <p>Enter Amount</p>
                  <Select
                    showSearch
                    style={{
                      width: 200,
                    }}
                    placeholder="Search to Select"
                    onChange={handleChange}
                    tokenSeparators={[","]}
                    options={options}
                  />
                </div>
                <div style={{ margin: "40px, 30px" }}>
                  <p>Expected BTC</p>
                  <div className="cart-input">
                    <input
                      id="numericInput"
                      inputmode="decimal"
                      placeholder="0.00"
                      name="quoteAmount"
                      autocomplete="off"
                      step="1"
                      max="9007199254740991"
                      type="number"
                      onChange={handlebtcChange}
                    />
                  </div>
                </div>
              </div>
              <Link to="/checkout">
                {" "}
                <div className="cart-btn">
                  <button>Add to Cart</button>
                </div>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
