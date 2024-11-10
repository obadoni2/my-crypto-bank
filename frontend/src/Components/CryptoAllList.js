import React from "react";
import CryptoAll from "./CryptoAll";

const CryptoAllList = ({ cryptoList }) => {
  return (
    <div>
      {cryptoList.map((currency, index) => (
        <CryptoAll currency={currency} key={index} />
      ))}
    </div>
  );
};

export default CryptoAllList;
