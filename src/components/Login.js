import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/Login.css"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { useCookies } from "react-cookie"

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const nav = useNavigate()
  const [cookies, setCookie] = useCookies(["pfAuthToken"])
  const [email, setEmail] = useState("")
  const [psw, setPsw] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e) => {
    e?.preventDefault()
    setIsLoading(true)
    axios
      ?.post("/login-user-api", {
        email,
        password: psw,
      })
      ?.then((res) => {
        console.log(res)
        setCookie("pfAuthToken", res?.data?.token, { path: "/" })
        nav("/front-demo/dashboard")
      })
      .finally(() => setIsLoading(false))
  }

  const handleForgetPassword = () => {
    nav(`/front-demo/forgotPassword`)
  }

  const handleRegister = () => {
    // Add your logic here for handling "Register" functionality
    // For example: nav("/register");
  }

  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100">
      <img src={logo} className="login-logo" alt="Logo"></img>
      <div className="login">
        <h2 className="mb-4 login-heading">Login to your Account</h2>
        <form className="needs-validation">
          <div className="form-group was-validated mb-2">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e?.target?.value)}
              required
            ></input>
            <div className="invalid-feedback">Please Enter your email</div>
          </div>
          <div className="form-group was-validated mb-2 position-relative">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                onChange={(e) => setPsw(e?.target?.value)}
                required
              ></input>

              <span
                className="input-group-text-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </span>
            </div>
            <div className="invalid-feedback">Please Enter your password</div>
          </div>
          <div className="form-group form-check mb-2">
            <input type="checkbox" className="form-check-input"></input>
            <label htmlFor="checkbox" className="">
              {" "}
              Remember me
            </label>
          </div>
          <div className="forget-register">
            <span className="forget-password" onClick={handleForgetPassword}>
              Forgot Password?
            </span>
            <span className="register-link" onClick={handleRegister}>
              Register
            </span>
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="btn  w-100 mt-2"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
