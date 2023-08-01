import React from "react"
import "../styles/footer.css"
import { Link } from "react-router-dom"
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
function Footer() {
  return (
    <>
    <div className="footer">

      <Link to="/front-demo/terms&conditions" className="termscondition">
        Terms & Conditions <span className="divider-bet">|</span>
      </Link>
      <Link to="/front-demo/privacypolicy" className="privacy">
        Privacy Policy
        </Link>

        
        <span className="copyright">Copyright © 2023 | All Rights Reserved</span>
        <div className="social-handles">
        <span className="social-media"><FacebookOutlined /> </span>
          <span className="social-media"><LinkedinOutlined /> </span>
          </div>
      </div>
        <div className="footer-mobile">
        <p className="copyright">Copyright © 2023 | All Rights Reserved</p>


        <div className="termandprivacy">
        <Link to="/front-demo/terms&conditions" className="termscondition">
          Terms & Conditions <span className="divider-bet">|</span>
        </Link>
        <Link to="/front-demo/privacypolicy" className="privacy">
          Privacy Policy
          </Link>
        </div>
        <div className="social-handles">
        <span className="social-media"><FacebookOutlined /> </span>
          <span className="social-media"><LinkedinOutlined /> </span>
          </div>
        </div>
</>
  )
}

export default Footer
