import React from "react"
import "../styles/Register.css"
import Footer from "./Footer"
import NavbarCart from "./NavbarCart"

const Register = () => {
  return (
    <>
      <NavbarCart />

      <div className="register-page">

       <div className="register-box">


         <div className="box1">
           <h1>
            Welcome Back!
           </h1>
            <h3>
            To keep connected with us please login <br />
               with your personal info 
            </h3>
            <button>
                Sign in 
            </button>
         </div>


         <div className="box2">
           <h1>
            Create Account
           </h1>

            <input type="name" placeholder="First Name" required/>
            <input type="name" placeholder="Last Name" required/>
           <input type="email"  placeholder='Email' required/>
           <input type="name" placeholder="Buisness Name" required/>
           <button>
                Sign in 
            </button>


         </div>



       </div>
      </div>
      <Footer/>
    </>
  )
}

export default Register
