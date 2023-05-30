import React, { useState } from "react"
import "./navbar.css"
import ham from "./assets/ham.png"
import { useHistory } from 'react-router-dom';
import ContactInfoCard from "./components/ContactInfoCard"

function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [resmenu, setresmenu] = useState("none")
  const [showComponent, setShowComponent] = useState(false);

  const handleButtonClick = () => {
    setShowComponent(true);
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
    <div className="header-two">
      <div className="header">
        <div className="right">
          <p
            style={{
              fontWeight: "bold",
              fontFamily: "inherit",
              fontSize: "20px",
            }}
          >
            LOGO
          </p>
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
              {/* <a href="#homee">Home</a> */}
              <a href="#aboutt" onClick={(e) => scrolll(e, "aboutt")}>
                Login
              </a>
              <div>
                <a href="#skillss" onClick={(e) => scrolll(e, "skillss")}>
                  Cart
                </a>
              </div>

              {/* <a href="#educationn" onClick={(e) => scrolll(e, "educationn")}>
             n 
            </a>
            <a href="#projectss" onClick={(e) => scrolll(e, "projectss")}>
             
            </a>
            <a href="#experirncee" onClick={(e) => scrolll(e, "experirncee")}>
            
            </a> */}
            </div>
          </div>
          <a href="#homee">Login</a>
          <div style={{ color: "white" }}>
            <button onClick={handleCartClick}>Cart</button>
            {isCartOpen && (
              <div className="cart-details-overlay">
                <div className="cart-details">
                  <div className="cart-inner">
                    <button onClick={handleCloseClick}>Close</button>
                    <p>Items in cart: {cartCount}</p>
                    <div><button className="checkout" onClick={handleButtonClick}><a href="">Checkout</a>
                    </button>
                    {showComponent && <ContactInfoCard />}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <section className="sub-header">
        <h1 className="sub-header-heading">Buy with Card</h1>
        <div style={{ display: "flex" }}>
          <h4 style={{ marginRight: "15px" }}>order history</h4>
          <h4 style={{ marginRight: "15px" }}>Recurring Plan</h4>
        </div>
      </section>
    </div>
  )
}

export default Navbar
