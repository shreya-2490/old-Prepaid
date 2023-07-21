const usdToBTC = (usdValue, btcRate) => {
  return (usdValue / btcRate)?.toFixed(5);
};

export { usdToBTC };
