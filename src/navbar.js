import React, { useState } from "react"
import "./navbar.css"
import { Link } from "react-router-dom"
import logo from "./assets/logo.png"
import {UserOutlined} from '@ant-design/icons';
function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [resmenu, setresmenu] = useState("none")

  const handleCartClick = () => {
    setIsCartOpen(true)
  }

  const handleCloseClick = () => {
    setIsCartOpen(false)
  }

  const addToCart = () => {
    setCartCount(cartCount + 1)
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
        <Link to="/">HOME</Link>
        <Link to="/">PREPAID CARDS</Link>
        <Link to="/">BULK ORDERS</Link>
        <Link to="/">CONTACT US</Link>
        <Link to="/login"><span className="user"><UserOutlined />LOGIN/REGISTER</span></Link>
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

export default Navbar
