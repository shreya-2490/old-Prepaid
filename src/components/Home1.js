import { useState, useEffect } from "react"
import {
  Alert,
  Input,
  Space,
  Tag,
  Checkbox,
  Skeleton,
  Modal,
  Button,
} from "antd"
import { useNavigate } from "react-router-dom"
import visawhite from "../assets/visahomewhite.png"
import masterwhite from "../assets/masterhomewhite.png"
import "../styles/home.css"
import axios from "axios"
import Footer from "./Footer"
import { Helmet } from "react-helmet"
import { usdToBTC } from "../utils/helper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faDollarSign,
  faBitcoinSign,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons"

const Home = () => {
  const [usdValue, setUSDValue] = useState("")
  const [btcValue, setBTCValue] = useState("")
  const [isValueValid, setIsValueValid] = useState(false)
  const [selectedButton, setSelectedButton] = useState(1)
  const [button, setButton] = useState(1)
  const [loadAmount, setLoadAmount] = useState("")
  const [selectedProvider, setSelectedProvider] = useState("All")
  const [selectedPrice, setSelectedPrice] = useState("low")
  const [alert, showAlert] = useState(false)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [emailValue, setEmailValue] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleButtonClick = (event, buttonId) => {
    event.preventDefault()
    setSelectedButton(buttonId)
    if (buttonId === 1) {
      setSelectedImage(visawhite)
    } else if (buttonId === 2) {
      setSelectedImage(masterwhite)
    }
  }

  const handleMainButtonClick = (event, buttonId) => {
    event.preventDefault()
    setButton(buttonId)
  }

  const handleBuyButtonClick = () => {
    navigate("/preowned", {
      state: { selectedProvider, selectedPrice },
    })
  }

  const handleBuyButtonClickMain = () => {
    if (btcValue === "0.00000") {
      setIsValueValid(true)
    } else if (!isChecked) {
      setIsModalVisible(true)
    } else {
      setIsValueValid(false)
      usdValue
        ? navigate(
            `/cart?usdValue=${usdValue}&btcValue=${btcValue}&selectedButton=${selectedButton}`
          )
        : showAlert(true)
    }
  }

  const handleProceed = () => {
    navigate(
      `/cart?usdValue=${usdValue}&btcValue=${btcValue}&selectedButton=${selectedButton}`
    )
  }
  const handleModalCancel = () => {
    setIsModalVisible(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.post("/api/rate-api")
        const btcPrice = response.data.value
        setBTCValue(usdToBTC(usdValue, btcPrice))
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [usdValue, loadAmount])

  const handleUSDSelect = (selectedValue) => {
    const value = parseFloat(selectedValue)
    setUSDValue(value)
    setIsValueValid(false)
    setLoadAmount(selectedValue)
    selectedValue ? showAlert(false) : showAlert(true)
  }
  const handleTagClick = (value) => {
    setLoadAmount(value)
  }

  const pageTitle = "Prepaid Friends | Your Bitcoin Bridge to Global Spending"
  const pageDescription =
    "Prepaid Friends: Your Bitcoin bridge to global spending. Exchange BTC for prepaid cards and enjoy seamless transactions worldwide. Join now!"

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <div className="main-body">
        <div className="home" id="homee">
          <div>
            <h1 className="home-heading">
              Your Bitcoin Bridge to Global Spending
              {/* <span style={{ color: "#FDC886", fontWeight: "400", fontFamily:"Typold Extended Black" }}>BTC</span> */}
            </h1>
            <h1 className="home-heading-1">
              Seamlessly Connect to a World of Possibilities with Dollar-Loaded
              Prepaid Cards!
            </h1>
          </div>

          <p className="subtitle">
            {/* Unlock the power of digital currencies with our cryptocurrency
            prepaid cards. Simplify your online purchases and enjoy a seamless
            payment experience. Our user-friendly platform allows you to
            effortlessly calculate the BTC equivalent of your desired prepaid
            card amount. Discover the many advantages of using cryptocurrency
            for your everyday transactions. */}
            {/* Embark on a digital currency journey with our cryptocurrency prepaid
            cards, transforming mundane transactions into seamless adventures. */}
          </p>
        </div>
        <div className="sider">
          <div className="box">
            <div className="buttons">
              <div className="first-btn">
                <button
                  className="buy"
                  style={{
                    backgroundColor: button === 1 ? "#fdc886" : "white",
                    color: "#1b1b1b",
                  }}
                  onClick={(event) => handleMainButtonClick(event, 1)}
                >
                  Buy Prepaid Card
                </button>
              </div>
            </div>
            <div className="sider-content">
              <div className="forms">
                <div style={{ marginBottom: "20px" }}></div>
                <div>
                  <form>
                    <div className="both-gray">
                      <div className="first-gray">
                        <div className="input-with-symbol">
                          <div className="currency-symbol">
                            <FontAwesomeIcon
                              icon={faDollarSign}
                              style={{ color: "#000000" }}
                            />
                          </div>
                          <Input
                            value={loadAmount}
                            onChange={(event) =>
                              handleUSDSelect(event.target.value)
                            }
                            placeholder="0.00"
                            className="placeholder-input"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                  <form>
                    <div className="both-gray">
                      <div className="first-gray">
                        <div className="input-with-symbol">
                          <span className="currency-symbol">
                            <FontAwesomeIcon
                              icon={faBitcoinSign}
                              style={{ color: "#000000" }}
                            />
                          </span>

                          <Input
                            value={btcValue}
                            placeholder="0.00"
                            className="placeholder-input"
                          />
                        </div>
                      </div>
                    </div>
                  </form>

                  <Space size={[0, 8]} wrap className="tags">
                    <span className="popular-amounts">Popular Amounts</span>
                    <Tag onClick={() => handleTagClick("50")}>$50</Tag>
                    <Tag onClick={() => handleTagClick("300")}>$300</Tag>
                    <Tag onClick={() => handleTagClick("500")}>$500</Tag>
                  </Space>
                  <div className="checkbox-email">
                    <Checkbox
                      style={{ marginRight: "0.2rem", marginTop: "0.8rem" }}
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                    />
                    Get order confirmation on email
                  </div>
                  <form>
                    {isChecked && (
                      <div className="both-gray">
                        <div className="first-gray">
                          <div className="input-with-symbol">
                            <span className="currency-symbol">
                              <FontAwesomeIcon
                                icon={faEnvelope}
                                style={{ color: "#000000" }}
                              />
                            </span>
                            <Input
                              type="email"
                              placeholder=" Enter your email"
                              value={emailValue}
                              onChange={(e) => setEmailValue(e.target.value)}
                              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                              rules={[
                                {
                                  required: true,
                                  message: "Email is required!",
                                },
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </form>
                  {usdValue && (
                    <div className="xtra-charges">
                      <>
                        {" "}
                        <p>BTC Exchange Fee: $1.2</p>
                        <p>Prepaid Card Purchase Price: $2.98</p>
                        <p style={{ fontWeight: "600" }}>Total</p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontWeight: "600",
                          }}
                        >
                          <p>$104</p>
                          <p>0.263636 BTC</p>
                        </div>
                      </>
                    </div>
                  )}
                  <Modal
                    title="⚠️ Warning"
                    visible={isModalVisible}
                    onCancel={handleModalCancel}
                    footer={null}
                    className="email-alert-box"
                  >
                    <div className="alert-email">
                      <p>
                        It appears that you have not entered your email address.
                        Without an email address, you will not receive an order
                        confirmation in your inbox.
                        <br />
                      </p>
                      <h5>Why is this important? </h5>
                      <p>
                        Your order confirmation email will contain essential
                        details about your purchase, including your card
                        details.
                      </p>
                      <h5>What to do if you proceed without an email? </h5>
                      <p>
                        If you choose to proceed without entering an email, you
                        can still contact our support team with your wallet
                        address to receive your card details and order
                        confirmation.
                      </p>
                    </div>
                    <div className="cart-modal-footer alert-btn">
                      <Button
                        className="ant-btn-default"
                        onClick={handleProceed}
                      >
                        OK
                      </Button>
                      <Button
                        className="ant-btn-default"
                        onClick={handleModalCancel}
                      >
                        Enter Email
                      </Button>
                    </div>
                  </Modal>
                  <div>
                    {alert && (
                      <Alert
                        style={{ marginTop: "15px", position: "relative" }}
                        message="Please enter a valid amount"
                        type="warning"
                        showIcon
                        closable
                      />
                    )}

                    <button
                      className="buy-usdt"
                      type="button"
                      onClick={handleBuyButtonClickMain}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Home
