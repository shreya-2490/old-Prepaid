import React, { useState } from "react"
import { Divider, Input, Space } from "antd"
import NavbarCart from "./NavbarCart"
import "../styles/dashboard.css"
import mastercard from "../assets/Mastercardcartpage.png"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import Reset from "./reset"
import { common } from "@mui/material/colors"

const Dashboard = () => {
  const nav = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(["pfAuthToken"])
  const onSearch = (value) => console.log(value)
  const { Search } = Input
  const [product, setProduct] = useState(false)
  const [reset, setReset] = useState(false)

  const handleChangeproduct = () => {
    setProduct(true)
  }
  const handleChangePassword = () => {
    setReset(true)
  }
  return (
    <>
      <NavbarCart />
      <div className="product-div">
        <div className="listing-design">
          <ul className="ul-list">
            <li className="user-profile">User Profile</li>
            <Divider />
            <li onClick={handleChangeproduct}>My Products</li>
            <Divider />
            <li onClick={handleChangePassword}>Change Password</li>
            <Divider />
            <li
              onClick={() => {
                removeCookie("pfAuthToken", { path: "/" })
                nav("/front-demo")
              }}
              className="signout-li"
            >
              Sign Out
            </li>
          </ul>
        </div>
        <div className="searchbox-div">
          {product ? (
            <>
              <div>
                <h2>My Products</h2>
                <img src={mastercard} className="product-image"></img>
                <div style={{ marginTop: "30px" }}>
                  {" "}
                  <h6 style={{ fontWeight: "bold" }}>Prepaid MasterCard</h6>
                  <p>$0.00</p>
                </div>
                <h6 style={{ fontWeight: "bold" }}>Used Product</h6>
              </div>
            </>
          ) : (
            ""
          )}
          {reset && <Reset />}
        </div>
        <div style={{ textAlign: "right" }}>
          {" "}
          <Space direction="vertical">
            <Search
              placeholder="Filter Products"
              onSearch={onSearch}
              style={{
                width: 200,
                borderRadius: "20px",
              }}
            />
          </Space>
        </div>
      </div>
    </>
  )
}

export default Dashboard
