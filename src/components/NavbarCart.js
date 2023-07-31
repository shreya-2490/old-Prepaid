import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Badge, Modal, Button } from "antd"
import { CartContext } from "./CartContext"
import "../styles/navbar.css"
import logo from "../assets/logo.png"
import "../styles/NavbarCart.css"
import Cart from "../shared-components/cart"
import Ticker from './ticker';

import { RxHamburgerMenu } from "react-icons/rx"
import { RxCross2 } from "react-icons/rx"

const NavbarCart = () => {
  const [showMedia, setMedia] = useState(false)
  const { cartCount } = useContext(CartContext)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [resmenu, setResMenu] = useState("none")
  const navigate = useNavigate()

  const handleCartClick = () => {
    setIsCartOpen(true)
  }

  const handleCloseClick = () => {
    setIsCartOpen(false)
  }

  const handleKeepShopping = () => {
    setIsCartOpen(false)
    navigate("/front-demo")
  }

  const handleCheckout = () => {
    navigate(`/front-demo/checkout`)
  }

  const handleHamburgerClick = (event) => {
    event.preventDefault()
    setMedia(!showMedia)
    document.body.classList.toggle("menu-open", !showMedia)
  }

  return (
    <>
      {/* <Ticker/> */}
      <nav
        className="navbarrrr"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* { hamburger menu } */}
        <button className="hamburger" onClick={handleHamburgerClick}>
          {showMedia ? (
            <RxCross2 style={{ color: "black" }} />
          ) : (
            <RxHamburgerMenu style={{ color: "black" }} />
          )}
        </button>

        {/* { logo } */}
        <div className="logo">
          <Link to="/front-demo">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        {/* { menu } */}
        <div className={showMedia ? "menu mobile-menu" : "menu"}>
          <ul>
            <div>
              <li>
                <Link to="/front-demo">HOME</Link>
              </li>

              <li>
                <Link to="/front-demo/bulkorder">BULK ORDERS</Link>
              </li>

              <li>
                <Link to="/front-demo/contactus">CONTACT</Link>
              </li>

              <li className="how">
                <Link to="/front-demo/howitworks">HOW IT WORKS</Link>
              </li>
            </div>
            <li>
              <Link to="/front-demo/login">
                <span className="user">
                  <UserOutlined
                    style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
                  />
                </span>
              </Link>
            </li>

            <li>
              <div className="nav-cart" onClick={handleCartClick}>
                <Badge count={cartCount} className="carticon">
                  <ShoppingCartOutlined />
                </Badge>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <Link to="/front-demo/login">
            <span className="user2">
              <UserOutlined style={{ fontSize: "1.5rem" }} />
            </span>
          </Link>
        </div>

        <div className="nav-cart1" onClick={handleCartClick}>
          <Badge count={cartCount} className="carticon">
            <ShoppingCartOutlined />
          </Badge>
        </div>
      </nav>

      <Modal
        visible={isCartOpen}
        onCancel={handleCloseClick}
        footer={null}
        className="cart-modal"
        style={{
          width: "10%",
        }}
      >
        <Cart />

        <div className="cart-modal-footer">
          <Button key="keepShopping" onClick={handleKeepShopping}>
            Keep Shopping
          </Button>
          <Button key="checkout" type="primary" onClick={handleCheckout}>
            Checkout ({cartCount})
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default NavbarCart
