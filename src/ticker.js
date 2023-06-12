import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ticker.css"

const Ticker = () => {
  const [tickerData, setTickerData] = useState([]);

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin,ripple,cardano,dogecoin,solana&vs_currencies=usd');
        const data = response.data;
        setTickerData(data);
      } catch (error) {
        console.log('Error fetching ticker data:', error);
      }
    };

    fetchTickerData();
  }, []);

  return (
    <div className="ticker-container">
      <div className="ticker-wrapper">
        {Object.entries(tickerData).map(([currency, prices]) => (
          <div key={currency} className="ticker-item">
            <span>{currency}: ${prices.usd}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
