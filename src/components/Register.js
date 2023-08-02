import React, { useState } from "react"
import "../styles/Register.css"
import Footer from "./Footer"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useCookies } from "react-cookie"
import NavbarCart from "./NavbarCart"
import { message, notification } from "antd"

const Register = () => {
  const [api, contextHolder] = notification.useNotification()
  const nav = useNavigate()
  const [cookies, setCookie] = useCookies(["pfAuthToken"])
  const [first_name, setName] = useState("")
  const [last_name, setLastName] = useState("")
  const [businessname, setBusinessName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = (e) => {
    e?.preventDefault()
    setIsLoading(true)
    axios
      ?.post("/register-user-api", {
        first_name,
        last_name,
        email,
      })
      ?.then((res) => {
        console.log(res)
        if (res.data.status=== "success") {
          notification.success({
            message: "Success",
            description:
              "Success!! Your Password has been sent to your Email Address",
          })
          nav("/front-demo")
        } else {
          return api.error({
            message: `Something went wrong!`,
            description: "Incorrect Credentials or Email Already in Use",
          })
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      {contextHolder}
      <NavbarCart />

      <div className="register-page">
        <div className="register-box">
          <div className="box1">
            <h1>Welcome!</h1>
            {/* <h3>
              To keep connected with us please signUp <br />
              with your personal info
            </h3> */}
          </div>

          <div className="box2">
            <h1>Create Account</h1>

            <input
              type="name"
              placeholder="First Name"
              required
              onChange={(e) => setName(e?.target?.value)}
            />
            <input
              type="lastname"
              placeholder="Last Name"
              required
              onChange={(e) => setLastName(e?.target?.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e?.target?.value)}
            />
            <input
              type="businessname"
              placeholder="Buisness Name"
              onChange={(e) => setBusinessName(e?.target?.value)}
            />
            <button type="submit" onClick={handleRegister} disabled={isLoading}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Register
