import React from "react"
import { useState, useRef } from "react"
import { Card, Select } from "antd"
import { Link } from "react-router-dom"

import Navbar from "./navbar"
import mastercard from "./assets/mastercard.jpg"
import "./CartPage.css"

const Cart = () => {
  const options = []

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
              <p className="custom-para2-cart">
              content to be ready for this
              </p>
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
