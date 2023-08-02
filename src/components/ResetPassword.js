import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/Login.css"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { notification } from "antd"

function ResetPassword() {
  const [newpswrd, setNewpswrd] = useState("")
  const [confirmpswrd, setConfirmpswrd] = useState("")
  const [api, contextHolder] = notification.useNotification()
  const nav = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://dev.prepaidfriends.com/verify-reset-password-page-api/{token}');
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);
    
  const handleReset = (e) => {
    e?.preventDefault()
    setIsLoading(true)
    axios
      ?.post("/reset-password-api", {
          newpswrd,
          confirmpswrd
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

  return (
    <>
      {contextHolder}
      <div className="wrapper d-flex align-items-center justify-content-center w-100">
        <img src={logo} className="login-logo" alt="Logo"></img>
        <div className="login">
          <h2 className="mb-4 login-heading">Forgot Password</h2>
          <form className="needs-validation">
            <div className="form-group was-validated mb-2">
              <label htmlFor="newpswrd" className="form-label">
                New Password
              </label>
              <input
                type="newpswrd"
                className="form-control"
                onChange={(e) => setNewpswrd(e?.target?.value)}
                required
              ></input>
              <label htmlFor="confirmpswrd" className="form-label">
                confirm Password
              </label>
              <input
                type="confirmpswrd"
                className="form-control"
                onChange={(e) => setConfirmpswrd(e?.target?.value)}
                required
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
      </div>
    </>
  )
}

export default ResetPassword
