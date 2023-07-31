import React from "react";
import "../styles/HowItWorks.css"
import Navbarlogo from "./Navbarlogo";
import timeline from  "../assets/Timeline.png"
import { Accordion } from "@prismane/core";



const HowItWorks = () =>{
    return(
        <>
         <Navbarlogo />
         <div className="outer-timeline">
            <div className="timeline">
               <h2>Our Algorithm</h2>
                <img src={timeline} alt="" />
            </div>
            <div className="questions">
              
                    <h2>Frequently  <br />Asked <span>Questions</span></h2>
                     
                    <Accordion>
                    <Accordion.Item value="first">
                        <Accordion.Control>
                          What does lorem ipsun actually mean ?
                         <Accordion.Icon />
                        </Accordion.Control>
                     <Accordion.Panel> I dont know </Accordion.Panel>
                     </Accordion.Item>

                    <Accordion.Item value="second">
                   <Accordion.Control>
                    How do we know what kind of sounds dinosaurs made?
                    <Accordion.Icon />
                    </Accordion.Control>
                     <Accordion.Panel>Ask the dinasour</Accordion.Panel>
                      </Accordion.Item>

                      <Accordion.Item value="third">
                       <Accordion.Control>
                      Why work from home is not as fun as we thought it would be?
                        <Accordion.Icon />
                        </Accordion.Control>
                       <Accordion.Panel>AC is not working at home</Accordion.Panel>
                        </Accordion.Item>

                      <Accordion.Item value="fourth">
                     <Accordion.Control>
                     In what way did human  beings started using words?
                        <Accordion.Icon />
                        </Accordion.Control>
                       <Accordion.Panel>In a very stupid way</Accordion.Panel>
                        </Accordion.Item>

                       <Accordion.Item value="fifth">
                         <Accordion.Control>
                            Which is the least developed area in the world
                             <Accordion.Icon />
                               </Accordion.Control>
                               <Accordion.Panel>USA</Accordion.Panel>
                              </Accordion.Item>
                               </Accordion>


                   
                </div>

            </div>

        
        </>
    )
}

export default HowItWorks