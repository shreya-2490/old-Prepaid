import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/Login.css"
import logo from "../assets/logo.png"
import { useNavigate, useLocation,useParams } from "react-router-dom"

import axios from "axios"
import { notification } from "antd"

function Reset() {
  const [password, setNewpswrd] = useState("")
  const [password_confirmation, setConfirmpswrd] = useState("")
  const [api, contextHolder] = notification.useNotification()
  const nav = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null);
  const { stoken } = useParams();
  console.log("Current URL location:", stoken);


  const handleReset = (e) => {
    e?.preventDefault()
    setIsLoading(true)
    axios
      ?.post("/reset-password-api", {
        password,
        password_confirmation,
        stoken,
      })
      ?.then((res) => {
        console.log(res)
        if (res.data.status === "success") {
          notification.success({
            message: "Success",
            description: "Password reset successfully",
          })
        } else {
          return api.error({
            message: `Something went wrong!`,
            description: "Token Expired. Please try again.",
          })
        }
      })
      .finally(() => setIsLoading(false))
  }
  const handlelogoClick = () => {
    nav("/front-demo/login")
  }


  return (
    <>
      {contextHolder}
      <div className="d-flex align-items-center justify-content-center w-100">
    
          <form className="needs-validation">
            <div className="form-group was-validated mb-2">
              <label htmlFor="newpswrd" className="form-label">
                Current Password
              </label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setNewpswrd(e?.target?.value)}
                rules={[
                  {
                    required: true,
                  },
                ]}
              ></input>
              <label htmlFor="confirmpswrd" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setConfirmpswrd(e?.target?.value)}
                rules={[
                  {
                    required: true,
                  },
                ]}
              ></input>
              <div className="invalid-feedback">Please Enter your email</div>
            </div>
            <button
              type="submit"
              onClick={handleReset}
              className="btn  w-100 mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      
    </>
  )
}

export default Reset
