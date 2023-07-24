import React, { useState, useContext, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DeleteOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Badge, Modal, Button, Divider } from "antd";
import { CartContext } from "./CartContext";
import visa from "../assets/Visacartpage.png";
import mastercard from "../assets/Mastercardcart.png";
import "../styles/navbar.css";
import logo from "../assets/logo.png";
import "../styles/NavbarCart.css";

function NavbarCart() {
  const { cartCount, cartItems, removeFromCart } = useContext(CartContext);
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
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
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
        <Fragment>
          {cartItems.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <>
              {cartItems?.map((cartItem) => {
                const { id, usdValue, card, quantity } = cartItem;
                const multipliedValue = usdValue * quantity;

                return (
                  <Fragment key={id}>
                    {card === "1" ? (
                      <>
                        <div className="visadiv">
                          <img
                            src={visa}
                            alt="Visa"
                            className="visacardtype-img"
                          />
                          <p>Visa</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="visadiv">
                          <img
                            src={mastercard}
                            alt="MasterCard"
                            className="cardtype-img"
                          />
                          <p>MasterCard</p>
                        </div>
                      </>
                    )}
                    <div className="delete">
                      <p>
                        {quantity} x ${usdValue} = ${multipliedValue}
                      </p>
                      <p>
                        <DeleteOutlined onClick={() => handleRemoveItem(id)} />
                      </p>
                    </div>
                    <Divider />
                  </Fragment>
                );
              })}
            </>
          )}
        </Fragment>

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
