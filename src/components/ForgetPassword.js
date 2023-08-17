import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleForget = (e) => {
    e?.preventDefault();
    setIsLoading(true);
    axios
      .post("/api/forgot-password-api", {
        email,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          notification.success({
            message: "Success",
            description: "Password reset link sent to your email",
          });
          nav('/login')
        } else {
          const errorMessage = res.data.message || "Something went wrong!";
          notification.error({
            message: "Error",
            description: errorMessage,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        notification.error({
          message: "Error",
          description: "An error occurred while processing your request.",
        });
      })
      .finally(() => setIsLoading(false));
  };

  const handlelogoClick = () => {
    nav("/login");
  };

  return (
    <>
      {contextHolder}
      <div className="wrapper d-flex align-items-center justify-content-center w-100">
        <img
          src={logo}
          className="login-logo"
          alt="Logo"
          onClick={handlelogoClick}
        ></img>
        <div className="login">
          <h2 className="mb-4 login-heading">Forgot Password</h2>
          <form className="needs-validation">
            <div className="form-group mb-2">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e?.target?.value)}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                title="Please enter a valid email address"
              />
              <div className="invalid-feedback">Please Enter your email</div>
            </div>
            <button
              type="submit"
              onClick={handleForget}
              disabled={!email || isLoading}
              className="btn  w-100 mt-2"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
