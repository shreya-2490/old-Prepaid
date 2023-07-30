import React from "react";
import "../styles/HowItWorks.css"
import Navbarlogo from "./Navbarlogo";
import timeline from  "../assets/Timeline.png"

const HowItWorks = () =>{
    return(
        <>
         <Navbarlogo />
         <div className="outer-timeline">
            <div className="timeline">
                <img src={timeline} alt="" />
            </div>
            <div className="questions">

            </div>
         </div>
        
        </>
    )
}

export default HowItWorks