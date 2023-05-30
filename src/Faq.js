import React from "react"
import "./Faq.css"
import { Collapse, Divider } from "antd"
const { Panel } = Collapse

function Faq() {
  return (
    <div className="Faq-main">
      <div className="Faq-inner">
        <div className="Faq-title">FAQs</div>
        <div className="Accordion">
          <Divider orientation="center"></Divider>
          <Collapse bordered={false}>
            <Panel header="Where can I buy USDT?" key="1">
              <p>
                Seamlessly buy USDT on OKX using popular cryptocurrencies such
                as BTC, ETH, SOL, OKB, as well as fiat currencies like USD, GBP,
                EUR, INR and more.
              </p>
            </Panel>
          </Collapse>
          <Divider orientation="left"></Divider>
          <Collapse bordered={false}>
            <Panel header="Can I buy USDT in my local currency?" key="2">
              <p>
                OKX allows you to buy USDT using over 30 fiat currencies,
                including USD, CAD, GBP, INR, and more. Visit our "Buy Crypto"
                page to buy USDT tokens using your preferred fiat currency.
              </p>
            </Panel>
          </Collapse>
          <Divider orientation="left"></Divider>
          <Collapse bordered={false}>
            <Panel header="How can I buy USDT with ETH or BTC?" key="3">
              <p>
                With OKX, you can swap your ETH or BTC holdings for USDT at zero
                spread and trading fees. To buy USDT using ETH or BTC, select
                "Convert" from the "Trade" menu on the top navigation bar,
                select the cryptocurrency you wish to swap, and complete the
                trade.
              </p>
            </Panel>
          </Collapse>
          <Divider orientation="left"></Divider>
          <Collapse bordered={false}>
            <Panel header="Can I buy USDT using my credit card?" key="4">
              <p>
                Yes. With OKX, you can buy USDT using your VISA, MasterCard, and
                ApplePay credit card. To purchase USDT using your credit card,
                go to the "Buy Crypto" page, enter the amount of fiat you wish
                to spend, and complete the payment using your desired credit
                card.
              </p>
            </Panel>
          </Collapse>
          <Divider orientation="left"></Divider>
          <Collapse bordered={false}>
            <Panel header="What is the cheapest way to buy USDT?" key="5">
              <p>
                OKX charges one of the lowest fees in the crypto market, making
                it the cheapest place to buy USDT. Using our "Convert" feature,
                you can buy USDT at zero fees.
              </p>
            </Panel>
          </Collapse>
          <Divider orientation="left"></Divider>
          <Collapse bordered={false}>
            <Panel
              header="What are the most popular cryptocurrencies to invest in today?"
              key="6"
            >
              <p>
                Top cryptos, based on market capitalization or total circulation
                value, include Bitcoin (BTC), Ethereum (ETH), Tether (USDT), USD
                Coin (USDC), and XRP (XRP). However, like all other cryptos, the
                above are also featured with volatility and risks. You should do
                your own research (DYOR) and evaluate your risk appetite before
                investing in any cryptos.
              </p>
            </Panel>
          </Collapse>
          <Divider orientation="left"></Divider>
          <Collapse bordered={false}>
            <Panel
              header="What are the top cryptocurrencies I can buy on OKX now?"
              key="7"
            >
              <p>
                OKX provides access to hundreds of cryptos and trading pairings.
                Some of the most popular cryptos on OKX include BTC, ETH, USDT,
                DOGE, SOL and OKB. You can visit our brand-new OKX Crypto
                Calculator. Select a crypto and a fiat currency to check the
                estimated real-time price.
              </p>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  )
}

export default Faq
