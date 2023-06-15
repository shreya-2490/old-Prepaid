import React, { useState } from "react"
import Ticker from "../ticker"
import Navbar from "../navbar"
import "./ContactUs.css"
import { Form, Input, Button, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
  }
  
  return (
    <>
      <Navbar />
      <div className="contactus-container">
        <h1 className="contactus-heading">Contact Us</h1>
        <div className="contactus-content">
          <p>
            Welcome to our Prepaid Cards Website! If you have any questions,
            comments, or feedback regarding our services or products, please
            don't hesitate to get in touch with us using the form below.
          </p>
        </div>
        <div className="contactus-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Ticker />
    </>
  )
}
export default ContactUs
