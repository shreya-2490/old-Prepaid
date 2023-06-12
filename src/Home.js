import { useState } from "react"
import { Select, Space } from "antd"
import { Link } from "react-router-dom"
import dollar from "./assets/dollar.png"
import bitcoin from "./assets/bitcoin.png"
import ReactTypingEffect from "react-typing-effect"
import "./home.css"
import Footer from "./Footer"

const Home = ({ addToCart }) => {
  const [bitcoinAmount, setBitcoinAmount] = useState("")
  const [usdAmount, setUSDAmount] = useState("")

  const handleBitcoinChange = (event) => {
    const { value } = event.target
    setBitcoinAmount(value)
    // Calculate equivalent USD amount
    const exchangeRate = 25706.5 // Replace with actual exchange rate
    const equivalentUSD = value * exchangeRate
    setUSDAmount(equivalentUSD)
  }

  function fetchCryptoPrices() {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,dogecoin&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) => updateCryptoPrices(data))
      .catch((error) => console.error(error))
  }

  // Update crypto currency prices in the ticker
  function updateCryptoPrices(prices) {
    document.getElementById(
      "bitcoin"
    ).textContent = `Bitcoin: $${prices.bitcoin.usd}`
    document.getElementById(
      "usd"
    ).textContent = `Ethereum: $${prices.ethereum.usd}`
  }
  fetchCryptoPrices()
  setInterval(fetchCryptoPrices, 1000)

  const originalHeadingText = "Buy USDT in a few steps"
  const [title, setTitle] = useState(originalHeadingText)
  const [text, setText] = useState("You'll pay")
  const [secondtext, setSecondtext] = useState("You'll recieve")
  const [button1Color, setButton1Color] = useState("white")
  const [button2Color, setButton2Color] = useState("#F0F0F0")

  const handleClick = () => {
    setTitle("Sell USDT in a few steps")
    setText("You'll sell")
    setSecondtext("You recieve")
  }
  const restoreHeadingText = () => {
    setTitle(originalHeadingText)
    setText("You'll pay")
    setSecondtext("You'll recieve")
  }

  const toggleButtonColors = () => {
    setButton1Color((prevColor) =>
      prevColor === "white" ? "#F0F0F0" : "white"
    )
    setButton2Color((prevColor) =>
      prevColor === "white" ? "#F0F0F0" : "white"
    )
  }

  window.addEventListener("DOMContentLoaded", function () {
    var numericInput = document.getElementById("numericInput")

    numericInput.addEventListener("mouseover", function () {
      numericInput.blur()
    })
  })

  return (
    <div className="main-body">
      <div className="home" id="homee">
        {/* <h1 className="home-heading">{title}</h1> */}
        <h1 className="home-heading">
          Exchange Bitcoin For
          <span className="effect-text">
            <ReactTypingEffect
              typingDelay={1000}
              eraseDelay={500}
              eraseSpeed={200}
              speed={30}
              text={[" Visa", "Mastercard", "Amex"]}
            />
          </span>
          <br />
          Prepaid Card
        </h1>
        <span className="subtitle">
          Enjoy the flexibility and accessibility of your digital assets by
          exchanging them for prepaid cards that can be used for online
          purchases, in-store transactions, or cash withdrawals at ATMs
          worldwide.
        </span>
        <div className="learn-more-btn">
          <Link to="/">
            <button>Learn More</button>
          </Link>
        </div>
      </div>
      <div className="sider">
        <div className="box">
          <div className="buttons">
            <div className="first-btn">
              <button
                onClick={() => {
                  restoreHeadingText()
                  toggleButtonColors()
                }}
                className="buy"
                style={{ backgroundColor: button1Color }}
              >
                Buy Prepaid Card With Crypto
              </button>
            </div>
            {/* <div className="second-btn">
              <button
                onClick={() => {
                  handleClick("Sell USDT in a few steps")
                  toggleButtonColors()
                }}
                className="sell"
                style={{ backgroundColor: button2Color }}
              >
                Sell
              </button>
            </div> */}
          </div>
          <div className="sider-content">
            <div style={{ display: "block" }}></div>
            <div className="forms">
              <div style={{ marginBottom: "20px" }}>
                <form>
                  <div className="both-gray">
                    <div className="first-gray">
                      <div className="first-gray-1">
                        <label className="pay">{text}</label>
                        <div className="input-div">
                          <div className="input-box">
                            <input
                              id="numericInput"
                              inputmode="decimal"
                              placeholder="0.00"
                              min="0"
                              name="quoteAmount"
                              autocomplete="off"
                              step="1"
                              max="9007199254740991"
                              type="number"
                              value={bitcoinAmount}
                              onChange={handleBitcoinChange}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="second-gray">
                      <div className="items">
                        <picture className="usdt-pic">
                          <img src={bitcoin}></img>
                        </picture>
                        <span className="dropdown-1">Bitcoin</span>
                      </div>
                    </div>
                  </div>
                </form>
                <p
                  id="bitcoin"
                  style={{
                    color: "#929292",
                    marginLeft: "15px",
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "16ox",
                    display: "inline",
                  }}
                ></p>
              </div>
              <div>
                <form>
                  <div className="both-gray">
                    <div className="first-gray">
                      <div className="first-gray-1">
                        <label className="pay">{secondtext}</label>
                        <div className="input-div">
                          <div className="input-box">
                            <input
                              id="numericInput"
                              inputmode="decimal"
                              placeholder="0.00"
                              name="quoteAmount"
                              autocomplete="off"
                              step="1"
                              max="9007199254740991"
                              type="number"
                              value={usdAmount}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="second-gray">
                      <div className="items">
                        <picture className="usdt-pic">
                          <img src={dollar}></img>
                        </picture>
                        <span className="dropdown-1">USD</span>
                      </div>
                    </div>
                  </div>
                </form>
                <p
                  id="usd"
                  style={{
                    color: "#929292",
                    marginLeft: "15px",
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "16ox",
                    display: "inline",
                  }}
                ></p>
                <div>
                  <Link to="/checkout">
                    <button
                      className="buy-usdt"
                      type="button"
                      onClick={addToCart}
                    >
                      Buy USDT
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
