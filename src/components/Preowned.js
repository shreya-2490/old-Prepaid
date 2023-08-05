import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import NavbarCart from "./NavbarCart";
import "../styles/preowned.css";
import { Button, Col, Modal, Pagination, Row, Select } from "antd";
import { useLocation, useNavigate } from "react-router";
import wifi from "../assets/wifi1.png";
import map from "../assets/map1.png";
import master from "../assets/mastercard preowned.png";
import visa from "../assets/visa preowned.png";
import { CartContext } from "./CartContext";
import Cart from "../shared-components/cart";

function Preowned() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedProvider: defaultProvider, selectedPrice: defaultPrice } =
    location.state || {};
  const [selectedProvider, setSelectedProvider] = useState(
    defaultProvider || "All"
  );
  const { addToCart, cartCount } = useContext(CartContext);
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(defaultPrice || "");
  const [currentPage, setCurrentPage] = useState(1);
  const { Option } = Select;

  const cardsPerPage = 12;

  useEffect(() => {
    axios
      .get("/get-card-with-type")
      .then((response) => {
        let filteredData = response.data.cards;
        if (selectedProvider !== "All") {
          filteredData = filteredData.filter(
            (card) => card.type === selectedProvider
          );
        }

        if (selectedPrice === "low") {
          filteredData = filteredData.sort((a, b) => a.price - b.price);
        } else if (selectedPrice === "high") {
          filteredData = filteredData.sort((a, b) => b.price - a.price);
        }
        setCardData(filteredData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching card data:", error);
        setLoading(false);
      });
  }, [selectedProvider, selectedPrice]);

  const handleProviderChange = (value) => {
    setLoading(true);
    setSelectedProvider(value);
  };

  const handlePriceChange = (value) => {
    setLoading(true);
    setSelectedPrice(value);
  };

  const handleAddToCart = (card) => {
    setIsCartOpen(true);
    addToCart({
      bin: card?.bin,
      card: card?.card,
      id: card?.id,
      cardId: card?.id,
      usdValue: card?.price,
      type: card?.type,
    });
  };

  const handleKeepShopping = () => {
    setIsCartOpen(false);
    navigate("/front-demo");
  };

  const handleCheckout = () => {
    navigate(`/front-demo/checkout`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return cardData.slice(startIndex, endIndex);
  };

  return (
    <>
      <NavbarCart />
      <div className="preloader-main">
        <div className="selection-container">
          <Select
            defaultValue={defaultProvider}
            onChange={handleProviderChange}
            className="selection-provider"
          >
            <Option value="All">All Providers</Option>
            <Option value="visa">Visa</Option>
            <Option value="master">Mastercard</Option>
          </Select>

          <Select
            placeholder="Select Price"
            onChange={handlePriceChange}
            className="selection-price"
            defaultValue={defaultPrice}
          >
            <Option value="low">Lowest Price</Option>
            <Option value="high">Highest Price</Option>
          </Select>
        </div>
        {loading ? (
          <div className="preloader">
            <div class="loader">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <>
            {getCurrentPageData()?.length > 0 ? (
              <Row className="mt-5" gutter={[24, 24]}>
                {getCurrentPageData()?.map((card) => (
                  <Col xs={24} md={6}>
                    <div class="wrappercard">
                      <div key={card.id}>
                        <div class="card">
                          <img src={map} class="map-img" />
                          <div class="top">
                            <h2 className="h2heading">CARDHOLDER</h2>
                            <h2 className="h2heading">
                              <b>${`${card.price}`}</b>
                            </h2>
                            <img src={wifi} />
                          </div>

                          <div class="infos">
                            <section class="card-number">
                              <h1 className="h1heading">{`**** **** **** ${card.card}`}</h1>
                            </section>
                            <div class="bottom">
                              <aside class="infos--bottom">
                                <section>
                                  <h2 className="h2heading">Expiry date</h2>
                                  <h3 className="h3heading">00/00</h3>
                                </section>
                                <section>
                                  <h2 className="h2heading">CVV</h2>
                                  <h3 className="h3heading">***</h3>
                                </section>
                              </aside>
                              <aside>
                                <section>
                                  {`${card.type}` === "visa" ? (
                                    <img src={visa} class="brand" />
                                  ) : (
                                    <img src={master} class="brand1" />
                                  )}
                                </section>
                              </aside>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button onClick={() => handleAddToCart(card)}>
                        Add To Cart
                      </Button>
                    </div>
                  </Col>
                ))}
              </Row>
            ) : (
              <div>No card data available</div>
            )}
            <Modal
              visible={isCartOpen}
              onCancel={() => setIsCartOpen(false)}
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
        )}
      </div>
      <Pagination
        current={currentPage}
        total={cardData.length}
        pageSize={cardsPerPage}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </>
  );
}
export default Preowned;
