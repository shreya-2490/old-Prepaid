import { useState } from "react"
import usdt from "./assets/img.webp"

import "./home.css"

const Home = ({addToCart}) => {
  const originalHeadingText = "Buy USDT in a few steps"
  const [title, setTitle] = useState(originalHeadingText)
  const [text, setText] = useState("You'll pay")
  const [secondtext, setSecondtext] = useState("You'll recieve")
  const [button1Color, setButton1Color] = useState('white');
  const [button2Color, setButton2Color] = useState('#F0F0F0');

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
    setButton1Color((prevColor) => (prevColor === 'white' ? '#F0F0F0' : 'white'));
    setButton2Color((prevColor) => (prevColor === 'white' ? '#F0F0F0' : 'white'));
  };

  window.addEventListener("DOMContentLoaded", function () {
    var numericInput = document.getElementById("numericInput")

    numericInput.addEventListener("mouseover", function () {
      numericInput.blur()
    })
  })

  return (
    <div className="main-body">
      <div className="home" id="homee">
        <h1 className="home-heading">{title}</h1>
        <span className="subtitle">Choose from 100 fiat currencies</span>
      </div>
      <div className="sider">
        <div className="box">
          <div className="buttons">
            <div className="first-btn">
              <button onClick={() => {restoreHeadingText(); toggleButtonColors()}} className="buy" style={{ backgroundColor: button1Color }}>
                Buy
              </button>
            </div>
            <div className="second-btn">
              <button
                onClick={() => {handleClick("Sell USDT in a few steps"); toggleButtonColors() }}
                className="sell"
                style={{ backgroundColor: button2Color }}
              >
                Sell
              </button>
            </div>
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
                  <button className="btn" type="button" onClick={addToCart}>Buy USDT</button>
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
