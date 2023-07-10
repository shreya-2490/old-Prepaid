import React, { useState, useContext } from "react"
import "./navbar.css"
import { Link } from "react-router-dom"
import logo from "./assets/logo.png"
import ham from "./assets/ham.png"
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Badge, Modal, Button } from "antd"
import { CartContext } from "./CartContext"

function NavbarCart() {
  const { cartCount } = useContext(CartContext)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [resmenu, setresmenu] = useState("none")

  const handleCartClick = () => {
    setIsCartOpen(true)
  }

  const handleCloseClick = () => {
    setIsCartOpen(false)
  }
  const handleKeepShopping = () => {
    window.location.href = `/`
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
        <img src={logo} alt="Logo" />
      </div>
      <div className="left">
        <div
          className="hamburg"
          onClick={() => {
            if (resmenu === "none") setresmenu("flex")
            else setresmenu("none")
          }}
        >
          <img src={ham} alt="Menu" />
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
          <div onClick={handleCartClick}>
            <Badge count={cartCount} className="carticon">
              <ShoppingCartOutlined />
            </Badge>
          </div>
        </div>
      </div>

      <Modal
        visible={isCartOpen}
        onCancel={handleCloseClick}
        footer={null}
        className="cart-modal"
        style={{
          borderRadius: "8px",
          top: "60px",
          left: "33%",
          width: "191px",
        }}
      >
        <div className="cart-modal-footer">
          <Button key="keepShopping" onClick={handleKeepShopping}>
            Keep Shopping
          </Button>
          {/* <Button key="checkout" type="primary" onClick={handleCheckout}>
            Checkout
          </Button> */}
        </div>
      </Modal>
    </div>
  )
}

export default NavbarCart
