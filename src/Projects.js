import React, { useState } from "react"
import "./projects.css"
import { Typography, Collapse, Button } from "antd"

const { Paragraph } = Typography
const { Panel } = Collapse

function Projects() {
  const [expanded, setExpanded] = useState(false)

  const handleReadMoreClick = () => {
    setExpanded(!expanded)
  }
  return (
    <div className="main-section">
      <section>
        <div className="section-box">
          <h1 className="section-heading">Guide on how to buy USDT (USDT)</h1>
          <div className="section-content-box">
            <div className="section-content">
              <p>Buy USDT with credit/debit card</p>
              <p>
                Buy USDT with your VISA, MasterCard, or ApplePay credit cards on
                OKX. Simply enter the amount of USDT you wish to purchase in
                your preferred currency and complete payment using your desired
                credit card.
              </p>
              <Collapse bordered={false}>
                <Panel
                  header={
                    <Button
                      type="link"
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        textDecoration: "underline",
                      }}
                      onClick={handleReadMoreClick}
                    >
                      Read More
                    </Button>
                  }
                  key="1"
                >
                  <Paragraph
                    ellipsis={{
                      rows: 2,
                      expandable: true,
                      symbol: "",
                    }}
                    onClick={handleReadMoreClick}
                  >
                    Purchase USDT instantly from our peer-to-peer (P2P) Market
                  </Paragraph>
                  <Paragraph>
                    Navigate to our escrow-powered peer-to-peer trading window
                    and purchase USDT tokens directly from trusted sellers using
                    40 payment methods.
                  </Paragraph>
                  <Paragraph>Buy USDT with bank transfer</Paragraph>
                  <Paragraph>
                    {" "}
                    OKX supports all major payment methods, including bank
                    transfers. To purchase USDT using your bank account, enter
                    the amount of USDT you wish to buy with your local currency,
                    and complete the payment using a bank transfer.
                  </Paragraph>
                  <Paragraph>Swap your crypto for USDT</Paragraph>
                  <Paragraph>
                    {" "}
                    OKX Convert allows you to instantly swap BTC, ETH, SOL, and
                    MATIC among other cryptocurrencies for USDT at zero fees. To
                    convert your crypto to USDT, select the cryptocurrency you
                    wish to exchange and complete the swap.
                  </Paragraph>
                </Panel>
              </Collapse>
            </div>
          </div>
          <div className="section-table"></div>
          <ul className="listing">
            <li className="list-item">
              <a href="">SOL TO USD</a>{" "}
            </li>
            <li className="list-item">
              <a href="">SOL TO USD</a>{" "}
            </li>
            <li className="list-item">
              <a href="">SOL TO USD</a>{" "}
            </li>
            <li className="list-item">
              <a href="">SOL TO USD</a>{" "}
            </li>
            <li className="list-item">
              <a href="">SOL TO USD</a>{" "}
            </li>
            <li className="list-item">
              <a href="">SOL TO USD</a>{" "}
            </li>
            <li className="list-item">
              <a href="">SOL TO USD</a>{" "}
            </li>
            <li className="list-item">
              <a href="">SOL TO USD</a>{" "}
            </li>
            <li className="list-item">
              <a href="">SOL TO USD</a>{" "}
            </li>
            <li className="list-item">
              <a href="">SOL TO USD</a>{" "}
            </li>
            <li className="list-item">
              <a href="">SOL TO USD</a>{" "}
            </li>
            <li className="list-item">
              <a href="">SOL TO USD</a>{" "}
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Projects
