import React from "react";
import httpClient from "../httpClient";

const TransactionRequest = ({
  transactionRequest,
  turnOnModal,
  onRequestResolve,
  updateTransactions,
  showTransactions,
}) => {
  const resolveRequest = async (value) => {
    onRequestResolve(transactionRequest);
    updateTransactions(transactionRequest);
    await httpClient.patch(
      "http://127.0.0.1:5000/transaction/updateTransactionState",
      {
        state: value,
        transaction_id: transactionRequest.hashID,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    showTransactions();
  };

  return (
    <div>
      <div className="movements__row">
        <div
          className="movements__type movements__type--pending"
          onClick={() => turnOnModal(transactionRequest)}
          style={{ cursor: "pointer" }}
        >
          {transactionRequest.amount} {transactionRequest.cryptocurrency}
        </div>
        <div className="movements__value">
          <label
            style={{ color: "green", cursor: "pointer" }}
            onClick={() => resolveRequest("IN_PROGRESS")}
          >
            ACCEPT
          </label>
        </div>
        <div className="movements__value">
          <label
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => resolveRequest("REJECTED")}
          >
            DECLINE
          </label>
        </div>
      </div>
    </div>
  );
};

export default TransactionRequest;
