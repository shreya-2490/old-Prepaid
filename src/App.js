import React, { useState } from "react"
import "./App.css"
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom"
import Home from "./Home"
import About from "./AboutUsdt"
import BulkCard from "./BulkCard"
import Offers from "./Offers"
import Choose from "./WhyChooseUs"
import Faq from "./Faq"
import Explore from "./exploreprepaid"
import Ticker from "./ticker"
import Footer from "./Footer"
import NavbarCart from "./NavbarCart"
import Checkout from "./components/Checkout"
import Login from "./components/Login"
import Cart from "./CartPage"
import BulkOrder from "./BulkOrder"
import ContactUs from "./components/ContactUs"
import Payment from "./components/payment"
import { CartProvider } from "./CartContext"

function App() {
  const [cartItems, setCartItems] = useState([])

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item])
  }
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<NavbarCart handleAddToCart={handleAddToCart} />}
            />
          </Routes>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          {/* <Routes>
          <Route path="/" element={<About />} />
        </Routes>
        <Routes>
          <Route path="/" element={<BulkCard />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Offers />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Choose />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Faq />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Explore />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Footer />} />
        </Routes> */}
          {/* <Routes>
          <Route path="/" element={<Ticker/>} />
        </Routes> */}

          <Routes>
            <Route
              path="/cart"
              element={<Cart handleAddToCart={handleAddToCart} />}
            />
          </Routes>
          <Routes>
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Routes>
            <Route path="/payment" element={<Payment />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/bulkorder" element={<BulkOrder />} />
          </Routes>
          <Routes>
            <Route path="/contactus" element={<ContactUs />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  )
}

export default App
