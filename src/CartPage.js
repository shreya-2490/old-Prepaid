import React from "react"
import { useState, useRef } from "react"
import { Card, Select } from "antd"
import { Link } from "react-router-dom"
import { useLocation, useParams } from "react-router-dom"
import axios from "axios"

import Navbar from "./navbar"
import mastercard from "./assets/mastercard.jpg"
import "./CartPage.css"

const Cart = ({ params }) => {
  const location = useLocation()
  const { usdValue } = useParams()
  const queryParams = new URLSearchParams(location.search)
  const [selectedCurrency, setSelectedCurrency] = useState("")
  const [btcValue, setBtcValue] = useState("")

  const handleCurrencyChange = async (value) => {
    setSelectedCurrency(value)

    try {
      // Fetch exchange rate data from CoinGecko API
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price",
        {
          params: {
            ids: "bitcoin",
            vs_currencies: "usd",
          },
        }
      )

      // Get the conversion rate from USD to BTC
      const usdToBtcRate = response.data.bitcoin.usd

      // Convert the selected USD value to BTC
      const btc = parseFloat(value) / usdToBtcRate

      // Update the BTC value in the state
      setBtcValue(btc.toFixed(8)) // Assuming 8 decimal places for BTC
    } catch (error) {
      console.error("Error fetching exchange rate:", error)
    }
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
  console.log("shreyaaparams", usdValue)
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
                Introducing the Prepaid Mastercard - Your Ultimate Financial
                Freedom! Are you tired of the limitations and restrictions
                imposed by traditional banking systems? Look no further! Our
                Prepaid Mastercard is the perfect solution for individuals
                seeking financial independence and control. With our prepaid
                Mastercard, you can enjoy all the benefits of a credit or debit
                card without the hassle of credit checks or tying your finances
                to a bank account. It's a game-changer for those who value
                flexibility and convenience.
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  margin: "-30px 40px",
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
                    tokenSeparators={[","]}
                    options={options}
                    value={selectedCurrency}
                    onChange={handleCurrencyChange}
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
                      value={btcValue}
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
