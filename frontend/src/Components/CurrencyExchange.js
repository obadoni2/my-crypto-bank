import React, { useState } from "react";
import httpClient from "../httpClient";

const CurrencyExchange = ({
  currencySymbolsUsd,
  amountToBuy,
  setAmountToBuy,
  turnOnErroModal,
}) => {
  // const [amountToBuy, setAmountToBuy] = useState(0);
  const [currencyBuy, setCurrencyBuy] = useState("USD");
  const [currencySell, setCurrecySell] = useState("USD");

  const exchangeCurrency = async () => {
    const resp = await httpClient.patch(
      "http://127.0.0.1:5000/crypto/exchange",
      {
        currencySell,
        currencyBuy,
        amountToBuy,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    setAmountToBuy(0);
    setCurrecySell("USD");
    setCurrencyBuy("USD");

    if (resp.data.error !== undefined) {
      turnOnErroModal(resp.data.error);
    }
  };
  return (
    <div>
      <div className="operation operation--close">
        <h2>Currency exchange</h2>
        <form className="form form--close">
          <input
            type="number"
            min = "0"
            className="form__input form__input--to"
            value={amountToBuy}
            onChange={(e) => {
              setAmountToBuy(e.target.value);
            }}
          />
          <select
            name="currency"
            className="form__input form__input--to"
            value={currencyBuy}
            onChange={(e) => {
              setCurrencyBuy(e.target.value);
            }}
          >
            {currencySymbolsUsd.map((symbol, index) => (
              <option key={index}>{symbol}</option>
            ))}
          </select>
          <select
            name="currency"
            className="form__input form__input--to"
            value={currencySell}
            onChange={(e) => {
              setCurrecySell(e.target.value);
            }}
          >
            {currencySymbolsUsd.map((symbol, index) => (
              <option key={index}>{symbol}</option>
            ))}
          </select>
          <button
            type="button"
            className="form__btn form__btn--close"
            onClick={exchangeCurrency}
          >
            &rarr;
          </button>
          <label className="form__label">Amount to buy</label>
          <label className="form__label">Buy</label>
          <label className="form__label">Sell</label>
        </form>
      </div>
    </div>
  );
};

export default CurrencyExchange;
