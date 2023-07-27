import React from "react"
import "../styles/footer.css"
import { Link } from "react-router-dom"
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

        
         <p className="copyright">Copyright © 2023 | All Rights Reserved</p>
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
        </div>
</>
  )
}

export default Footer
