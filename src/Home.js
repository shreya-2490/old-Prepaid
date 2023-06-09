import { useState } from "react"
import { Select, Space } from "antd"
import { Link } from "react-router-dom"
import usdt from "./assets/img.webp"
import ReactTypingEffect from "react-typing-effect"
import "./home.css"

const Home = ({ addToCart }) => {
  const handleChange = (value) => {
    console.log(` ${value}`, "shreya")
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
      "us"
    ).textContent = `Bitcoin: $${prices.bitcoin.usd}`
    document.getElementById(
      "ethereum"
    ).textContent = `Ethereum: $${prices.ethereum.usd}`
    document.getElementById(
      "litecoin"
    ).textContent = `Litecoin: $${prices.litecoin.usd}`
    document.getElementById(
      "dogecoin"
    ).textContent = `Dogecoin: $${prices.dogecoin.usd}`
  }

  // Fetch crypto prices initially and update every 5 seconds
  fetchCryptoPrices()
  setInterval(fetchCryptoPrices, 5000)

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
              eraseDelay={2000}
              eraseSpeed={50}
              speed={50}
              text={[" Visa", "Mastercard", "Amex"]}
            />
          </span>
          Prepaid Card
        </h1>
        <span className="subtitle">
          Enjoy the flexibility and accessibility of your digital assets by
          exchanging them for prepaid cards that can be used for online
          purchases, in-store transactions, or cash withdrawals at ATMs
          worldwide.
        </span>
        <div className="learn-more-btn">
          <Link to="/"><button>Learn More</button></Link>
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
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="second-gray">
                      <button type="button" className="second-gray-1">
                        <span className="second-btn-content">
                          <span>
                            <div className="items">
                              <Space wrap>
                                <Select
                                  className="dropdown-1"
                                  id="us"
                                  defaultValue="Bitcoin"
                                  style={{
                                    width: "91px",
                                    marginLeft: "-10px",
                                  }}
                                  onChange={handleChange}
                                  options={[
                                    {
                                      image: usdt,
                                      value: "Bitcoin",
                                      label: "Bitcoin",
                                    },
                                    {
                                      value: "Ethereum",
                                      label: "Ethereum",
                                    },
                                    {
                                      value: "Litecoin",
                                      label: "Litecoin",
                                    },
                                    {
                                      value: "Dogecoin",
                                      label: "Dogecoin",
                                    },
                                  ]}
                                />
                              </Space>
                              {/* <picture className="usdt-pic">
                                <img src={usdt}></img>
                              </picture> */}
                              {/* <span className="dropdown-1">USDT</span> */}
                            </div>
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
                <p
                  id="us"
                  style={{
                    color: "#929292",
                    marginLeft: "15px",
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "16ox",
                    display: "inline",
                  }}
                >
                  83-8,200,000 INR
                </p>
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
                              min="0"
                              name="quoteAmount"
                              autocomplete="off"
                              step="1"
                              max="9007199254740991"
                              type="number"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="second-gray">
                      <button type="button" className="second-gray-1">
                        <span className="second-btn-content">
                          <span>
                            <div className="items">
                              <picture className="usdt-pic">
                                <img src={usdt}></img>
                              </picture>
                              <span className="dropdown-1">USDT</span>
                            </div>
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
                <p
                  id="us1"
                  style={{
                    color: "#929292",
                    marginLeft: "15px",
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "16ox",
                    display: "inline",
                  }}
                >
                  1 USDT ≈ 88.96 INR
                </p>
                <div>
                  <button
                    className="buy-usdt"
                    type="button"
                    onClick={addToCart}
                  >
                    Buy USDT
                  </button>
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
