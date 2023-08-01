import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function Login() {
  const nav = useNavigate();
  const [cookies, setCookie] = useCookies(["pfAuthToken"]);
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e?.preventDefault();
    setIsLoading(true);
    axios
      ?.post("/login-user-api", {
        email,
        password: psw,
      })
      ?.then((res) => {
        console.log(res);
        setCookie("pfAuthToken", res?.data?.token, { path: "/" });
        nav("/front-demo/dashboard");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100">
      <img src={logo} className="login-logo"></img>
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
          <div className="form-group was-validated mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPsw(e?.target?.value)}
              required
            ></input>
            <div className="invalid-feedback">Please Enter your password</div>
          </div>
          <div className="form-group form-check mb-2">
            <input type="checkbox" className="form-check-input"></input>
            <label htmlFor="checkbox" className="">
              {" "}
              Remember me
            </label>
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
  );
}

export default Login;
