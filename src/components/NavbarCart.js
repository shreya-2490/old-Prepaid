import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Badge, Modal, Button } from "antd";
import { CartContext } from "./CartContext";
import "../styles/navbar.css";
import logo from "../assets/logo.png";
import "../styles/NavbarCart.css";
import Cart from "../shared-components/cart";

function NavbarCart() {
  const { cartCount } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [resmenu, setResMenu] = useState("none");
  const navigate = useNavigate();

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseClick = () => {
    setIsCartOpen(false);
  };

  const handleKeepShopping = () => {
    setIsCartOpen(false);
    navigate("/front-demo");
  };

  const handleCheckout = () => {
    navigate(`/front-demo/checkout`);
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/front-demo">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="left">
        <div
          className="hamburg"
          onClick={() => {
            if (resmenu === "none") setResMenu("flex");
            else setResMenu("none");
          }}
        >
          <MenuOutlined />
          <div className="navmenu" style={{ display: resmenu }}>
            <Link to="/front-demo">HOME</Link>
            <Link to="/front-demo/bulkorder">BULK ORDERS</Link>
            <Link to="/front-demo/contactus">CONTACT US</Link>
          </div>
        </div>
        <div className="first-four-navigation">
          <Link to="/front-demo">HOME</Link>
          <Link to="/front-demo/bulkorder">BULK ORDERS</Link>
          <Link to="/front-demo/contactus">CONTACT </Link>
          <Link to="/front-demo/login">
            <span className="user">
              <UserOutlined style={{ fontSize: "1.5rem" }} />
            </span>
          </Link>
        </div>

        <div className="navlogin-cart">
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
    </div>
  );
}

export default NavbarCart;
