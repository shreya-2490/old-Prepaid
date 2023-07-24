import React from "react"
import "../styles/footer.css"
import { Link } from "react-router-dom"
function Footer() {
  return (
    <div className="footer">
      <Link to="/front-demo/terms&conditions" className="termscondition">
        Terms & Conditions <span className="divider-bet">|</span>
      </Link>
      <Link to="/front-demo/privacypolicy" className="privacy">
        Privacy Policy
      </Link>
    </div>
  )
}

export default Footer
