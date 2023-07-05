import React, { useState, useContext } from "react"
import "./navbar.css"
import { Link } from "react-router-dom"
import logo from "./assets/logo.png"
import ham from "./assets/ham.png"
import { useLocation } from "react-router-dom"
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Badge } from "antd"
import { CartContext } from "./CartContext"

function NavbarCart() {
  const { cartCount } = useContext(CartContext)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [resmenu, setresmenu] = useState("none")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const input1 = queryParams.get("usdValue")
  const input2 = queryParams.get("btcValue")
  const input3 = queryParams.get("selectedButton")
  const [selectedButton, setSelectedButton] = useState(input3)
  const [title, setTitle] = useState("NEW PREPAID MASTERCARD")
  const [usdValue, setUSDValue] = useState(input1)
  const [btcValue, setBtcValue] = useState(input2)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const handleCartClick = () => {
    setIsCartOpen(true)
  }

  const handleCloseClick = () => {
    setIsCartOpen(false)
  }

  const scrolll = (e, id) => {
    e.preventDefault()

    const target = document.getElementById(id)
    console.log(target.getBoundingClientRect().top)

    const inid = setInterval(() => {
      const targetcoo = target.getBoundingClientRect().top

      if (targetcoo < -10) {
        if (targetcoo >= 80) {
          clearInterval(inid)
          return
        } else {
          window.scrollBy(0, -70)
        }
      } else {
        if (targetcoo <= 60) {
          clearInterval(inid)
          return
        } else {
          window.scrollBy(0, 70)
        }
      }
    }, 0)
  }
  window.addEventListener("scroll", function () {
    var subheader = document.querySelector(".subheader")
    var headerHeight = document.querySelector("header").offsetHeight
    var scrollPosition = window.scrollY

    if (scrollPosition > headerHeight) {
      subheader.classList.add("fixed")
    } else {
      subheader.classList.remove("fixed")
    }
  })

  return (
    <div className="header">
      <div className="logo">
        <img src={logo}></img>
      </div>
      <div className="left">
        <div
          className="hamburg"
          onClick={() => {
            if (resmenu == "none") setresmenu("flex")
            else setresmenu("none")
          }}
        >
          <img src={ham}></img>
          <div className="navmenu" style={{ display: resmenu }}>
            <Link to="/">HOME</Link>
            <Link to="/bulkorder">BULK ORDERS</Link>
            <Link to="/contactus">CONTACT US</Link>
            <Link to="/login">
              <span className="user">
                <UserOutlined />
                LOGIN
              </span>
            </Link>
          </div>
        </div>
        <div className="first-four-navigation"> 
        <Link to="/">HOME</Link>
          <Link to="/bulkorder">BULK ORDERS</Link>
          <Link to="/">HOW IT WORKS</Link>
        <Link to="/contactus">CONTACT US</Link>
         
        </div>
        <div className="navlogin">
        <Link
          to={`/checkout?usdValue=${usdValue}&btcValue=${btcValue}&selectedButton=${selectedButton}`}
          
        >
          <Badge count={cartCount}className="carticon">
            <ShoppingCartOutlined/>
          </Badge>
        </Link>
        </div>
   

        {/* <div style={{ color: "white" }}>
          <button onClick={handleCartClick}>Cart</button>
          {isCartOpen && (
            <div className="cart-details-overlay">
              <div className="cart-details">
                <div className="cart-inner">
                  <button onClick={handleCloseClick}>Close</button>
                  <p>Items in cart: {cartCount}</p>
                  <div>
                    <button className="checkout">
                      <Link to="/checkout">Checkout</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div> */}
      </div>
    </div>
  )
}

export default NavbarCart
