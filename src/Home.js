import { useState } from "react"
import { Select, Card, Image, Alert } from "antd"
import { Link } from "react-router-dom"
import dollar from "./assets/dollar.png"
import bitcoin from "./assets/bitcoin.png"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import visa from "./assets/visa.svg"
import mastercard from "./assets/mastercard.svg"
import ReactTypingEffect from "react-typing-effect"
import "./home.css"

const { Option } = Select

const Home = ({ addToCart }) => {
  const [usdValue, setUSDValue] = useState("")
  const [btcValue, setBTCValue] = useState("0.00")
  const [selectedCard, setSelectedCard] = useState(null)
  const [isValueValid, setIsValueValid] = useState(false)

  const handleCardSelect = (value) => {
    setSelectedCard(value)
  }
  const handleBuyButtonClick = (e) => {
    if (usdValue === "") {
      e.preventDefault()
      setIsValueValid(true)
    } else {
      setIsValueValid(false)
    }
  }
  const renderOption = (cardName, imagePath) => (
    <div>
      <img
        src={imagePath}
        alt={cardName}
        style={{ width: "20px", marginRight: "8px" }}
      />
      {cardName}
    </div>
  )
  const exchangeRate = 0.000038 // Example exchange rate, replace with the actual rate

  const handleUSDChange = (event) => {
    const usdInput = parseFloat(event.target.value)
    setUSDValue(usdInput)
    setBTCValue(usdInput * exchangeRate)
    setIsValueValid(false)
  }

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
              eraseSpeed={160}
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
              <button className="buy" style={{ backgroundColor: "white" }}>
                Buy Prepaid Card With Crypto
              </button>
            </div>
          </div>
          <div className="sider-content">
            <div style={{ display: "block" }}></div>
            <div className="forms">
              <div style={{ marginBottom: "20px" }}>
                <form>
                  <div className="card-selector-container">
                    <p>Select Card Type</p>
                    {/* <Select
                      value={selectedCard}
                      onChange={handleCardSelect}
                      className="card-selector"
                    >
                      <Option value="visa">
                        <Card
                          actions={[
                            selectedCard === "visa" && (
                              <span onClick={handleCardCancel}>Cancel</span>
                            ),
                          ]}
                        >
                          <Image src={visa} alt="Visa Card" />
                        </Card>
                      </Option>
                      <Option value="mastercard">
                        <Card
                          actions={[
                            selectedCard === "mastercard" && (
                              <span onClick={handleCardCancel}>Cancel</span>
                            ),
                          ]}
                        >
                          <Image src={mastercard} alt="Mastercard" />
                        </Card>
                      </Option>
                    </Select> */}

                    <Select
                      className="card-selector"
                      value={selectedCard}
                      onChange={handleCardSelect}
                      style={{ width: 180 }}
                      dropdownMatchSelectWidth={false}
                      dropdownStyle={{ minWidth: 200 }}
                    >
                      <Option
                        value="visa"
                        label={renderOption("Visa", "./assets/visa.svg")}
                      >
                        Visa
                      </Option>
                      <Option
                        value="mastercard"
                        label={renderOption(
                          "Mastercard",
                          "./assets/mastercard.svg"
                        )}
                      >
                        Mastercard
                      </Option>
                    </Select>
                  </div>
                </form>
              </div>
              <div>
                <form>
                  <div className="both-gray">
                    <div className="first-gray">
                      <div className="first-gray-1">
                        <label className="pay">Enter Amount</label>
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
                              value={usdValue}
                              onChange={handleUSDChange}
                            />
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
                  style={{
                    color: "black",
                    marginLeft: "15px",
                    fontSize: "15px",
                    fontWeight: "400",
                    lineHeight: "16ox",
                    display: "inline",
                  }}
                >
                  <picture className="bit-pic">
                    <img src={bitcoin}></img>
                  </picture>
                  <span style={{ margin: "10px" }}>{btcValue} BTC</span>
                </p>
                {isValueValid && (
                    <Alert
                      style={{ marginTop: "15px", position: "relative" }}
                      message="Please fill all details"
                      type="warning"
                      showIcon
                      closable
                    />
                  )}
                <div>
                  <Link  to="/cart">
                    <button
                      className="buy-usdt"
                      type="button"
                      onClick={handleBuyButtonClick}
                    >
                      Buy Now
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
