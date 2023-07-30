import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavbarCart from "./components/NavbarCart";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Cart from "./components/CartPage";
import BulkOrder from "./components/BulkOrder";
import ContactUs from "./components/ContactUs";
import Payment from "./components/payment";
import { CartProvider } from "./components/CartContext";
import Dashboard from "./components/Dashboard";
import Preowned from "./components/Preowned";
import Terms from "./components/Terms&Conditions";
import Policy from "./components/Privacypolicy";
import BulkCheckout from "./components/BulkCheckout";
import { Thankyou } from "./components/Thankyou";
import HowItWorks from "./components/HowItWorks"
import ScrollToTop from './components/scroll';


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("low");

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };
  return (
    <div className="App">
      <CartProvider>
        <Router>
        <ScrollToTop>
          <Routes>
            <Route
              path="/front-demo"
              element={<NavbarCart handleAddToCart={handleAddToCart} />}
            />
          </Routes>
          <Routes>
            <Route
              path="/front-demo"
              element={
                <Home
                  selectedProvider={selectedProvider}
                  selectedPrice={selectedPrice}
                />
              }
            />
          </Routes>
         

          <Routes>
            <Route
              path="front-demo/cart"
              element={<Cart handleAddToCart={handleAddToCart} />}
            />
          </Routes>
          <Routes>
            <Route path="front-demo/checkout" element={<Checkout />} />
          </Routes>
          <Routes>
            <Route
              path="/front-demo/bulk-checkout"
              element={<BulkCheckout />}
            />
          </Routes>
          <Routes>
            <Route path="front-demo/payment" element={<Payment />} />
          </Routes>
          <Routes>
            <Route path="front-demo/login" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="front-demo/bulkorder" element={<BulkOrder />} />
          </Routes>
          <Routes>
            <Route path="front-demo/contactus" element={<ContactUs />} />
          </Routes>
          <Routes>
            <Route path="front-demo/terms&conditions" element={<Terms />} />
          </Routes>
          <Routes>
            <Route path="front-demo/privacypolicy" element={<Policy />} />
          </Routes>
          <Routes>
            <Route path="front-demo/dashboard" element={<Dashboard />} />
          </Routes>
          <Routes>
            <Route path="front-demo/thankyou" element={<Thankyou />} />
          </Routes>
          <Routes>
            <Route path="front-demo/howitworks" element={<HowItWorks />} />
          </Routes>
          <Routes>
            <Route
              path="front-demo/preowned"
              element={
                <Preowned
                  selectedProvider={selectedProvider}
                  selectedPrice={selectedPrice}
                />
              }
            />
          </Routes>
          </ScrollToTop>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
