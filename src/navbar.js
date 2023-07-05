import React, { useState } from "react"
import "./navbar.css"
import { Link } from "react-router-dom"
import logo from "./assets/logo.png"
import ham from "./assets/ham.png"
import {UserOutlined} from '@ant-design/icons';
function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [resmenu, setresmenu] = useState("none")
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
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
        <div
          className="hamburg"
          onClick={() => {
            if (resmenu == "none") setresmenu("flex");
            else setresmenu("none");
          }}
        >
          <img src={ham}></img>
          <div className="navmenu" style={{ display: resmenu }}>
          <Link to="/">HOME</Link>
        <Link to="/bulkorder">BULK ORDERS</Link>
        <Link to="/contactus">CONTACT US</Link>
        <Link to="/login"><span className="user"><UserOutlined />LOGIN</span></Link>
          </div>
        </div>
        <div className="first-four-navigation"> 
        <Link to="/">HOME</Link>
        <Link to="/bulkorder">BULK ORDERS</Link>
        <Link to="/contactus">CONTACT US</Link>
          <Link to="/">How It Works</Link>
        </div>
        <div className="navlogin">
          <Link to="/login" ><span className="user"><UserOutlined />LOGIN</span></Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
