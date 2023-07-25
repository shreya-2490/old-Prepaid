import React from "react"
import { LeftOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import "../styles/navbar.css"

function NavbarLogo() {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="headerlogo">
      <div className="logocheckout" onClick={goBack}>
        <LeftOutlined className="back-arrow" />
      </div>
      <Link to="/front-demo">
        <img src={logo} alt="Logo" className="logopayment" />
      </Link>
    </div>
  )
}

export default NavbarLogo
