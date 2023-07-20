import React, { useState, useEffect } from "react"
import axios from "axios"
import NavbarCart from "./NavbarCart"
import Footer from "./Footer"
import "../styles/preowned.css"
import { Button } from "antd"
import { useLocation } from "react-router"

function Preowned() {
  const [cardData, setCardData] = useState([])
  const location = useLocation()
  const { selectedProvider, selectedPrice } = location.state || {}

  useEffect(() => {
    axios
      .get("/get-card-with-type")
      .then((response) => {
        let filteredData = response.data.cards
        if (selectedProvider !== "All") {
          filteredData = filteredData.filter(
            (card) => card.type === selectedProvider
          )
        }

        if (selectedPrice === "low") {
          filteredData = filteredData.sort((a, b) => a.price - b.price)
        } else if (selectedPrice === "high") {
          filteredData = filteredData.sort((a, b) => b.price - a.price)
        }
        setCardData(filteredData)
      })
      .catch((error) => {
        console.error("Error fetching card data:", error)
      })
  }, [])

  return (
    <>
      <NavbarCart />
      <div className="card-container">
        {cardData.length > 0 ? (
          cardData.map((card) => (
            <div class="wrappercard">
              <div class="container" key={card.id}>
                <div class="card">
                  <img src="https://i.ibb.co/PYss3yv/map.png" class="map-img" />
                  <div class="top">
                    <h2 className="h2heading">CARDHOLDER</h2>
                    <h2 className="h2heading">
                      <b>${`${card.price}`}</b>
                    </h2>
                    <img src="https://cdn-icons-png.flaticon.com/512/1436/1436392.png" />
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
                            <img
                              src="https://i.ibb.co/WHZ3nRJ/visa.png"
                              class="brand"
                            />
                          ) : (
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MasterCard_logo.png/320px-MasterCard_logo.png"
                              class="brand1"
                            />
                          )}
                        </section>
                      </aside>
                    </div>
                  </div>
                </div>
              </div>
              <Button>Add To Cart</Button>
            </div>
          ))
        ) : (
          <div>No card data available</div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  )
}
export default Preowned
