import React, { useState } from "react";
import httpClient from "../httpClient";
import { useNavigate } from "react-router-dom";

const Transfer = ({
  currencySymbols,
  transferAmount,
  setTransferAmount,
  turnOnErroModal,
}) => {
  const [recepient, setRecepient] = useState("");
  const [currencyTransfer, setCurrencyTrasfer] = useState("BTC");
  const navigate = useNavigate();
  const validateTransfer = async () => {
    await httpClient.get("http://127.0.0.1:5000/transaction/sendOtp", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
    });
    navigate("/verificationTransaction", {
      state: {
        recepient: recepient,
        transferAmount: transferAmount,
        currencyTransfer: currencyTransfer,
      },
    });
    setTransferAmount(0);
    setCurrencyTrasfer("BTC");
    setRecepient("");
  };
  // const transferCrypto = async () => {
  //   const resp = await httpClient.post(
  //     "http://127.0.0.1:5000/createTransaction",
  //     {
  //       recepient,
  //       transferAmount,
  //       currencyTransfer,
  //     }
  //   );

  //   setTransferAmount(0);
  //   setCurrencyTrasfer("BTC");
  //   setRecepient("");

  //   console.log(resp);
  //   if (resp.data.error !== undefined) {
  //     turnOnErroModal(resp.data.error);
  //   }
  // };
  return (
    <div>
      <div className="operation operation--transfer">
        <h2>Transaction</h2>
        <form className="form form--transfer">
          <input
            type="text"
            className="form__input form__input--to"
            value={recepient}
            onChange={(e) => {
              setRecepient(e.target.value);
            }}
          />
          <input
            type="number"
            min= "0"
            className="form__input form__input--to"
            value={transferAmount}
            onChange={(e) => {
              setTransferAmount(e.target.value);
            }}
          />
          <select
            name="currency"
            className="form__input form__input--to"
            value={currencyTransfer}
            onChange={(e) => {
              setCurrencyTrasfer(e.target.value);
            }}
          >
            {currencySymbols.map((symbol, index) => (
              <option key={index}>{symbol}</option>
            ))}
          </select>
          <button
            type="button"
            className="form__btn form__btn--transfer"
            onClick={validateTransfer}
          >
            &rarr;
          </button>
          <label className="form__label">Transfer to</label>
          <label className="form__label">Amount</label>
          <label className="form__label">Currency</label>
        </form>
      </div>
    </div>
  );
};

export default Transfer;
