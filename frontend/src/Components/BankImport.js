import httpClient from "../httpClient";
import React, { useState } from "react";

const BankImport = ({ userMoney, setUserMoney }) => {
  const [amount, setAmount] = useState(0);
  const transferMoney = async () => {
    const resp = await httpClient.patch(
      "http://127.0.0.1:5000/account/deposit",
      { amount },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    setAmount(0);
    setUserMoney(userMoney + amount);
  };

  return (
    <div>
      <div className="operation operation--loan">
        <h2>Import money from payment card</h2>
        <form className="form form--loan">
          <input
            type="number"
            min = "0"
            className="form__input form__input--loan-amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <button
            type="button"
            className="form__btn form__btn--loan "
            onClick={transferMoney}
          >
            &rarr;
          </button>
          <label className="form__label form__label--loan">Amount</label>
        </form>
      </div>
    </div>
  );
};

export default BankImport;

