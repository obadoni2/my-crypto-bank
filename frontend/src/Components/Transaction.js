import React from "react";

const Transaction = ({ transaction, userEmail, turnOnModal }) => {
  let transactionAmount;
  let transactionColor;
  let transactionState;

  if (transaction.state === "REJECTED") {
    transactionColor = "withdrawal";
    transactionAmount = "REJECTED";
  } else if (
    transaction.state === "IN_PROGRESS" ||
    transaction.state === "WAITING_FOR_USER"
  ) {
    transactionColor = "progress";
    if (userEmail === transaction.sender) {
      transactionAmount = "-" + transaction.amount;
    } else {
      transactionAmount = "+" + transaction.amount;
    }

    transactionState = "mining";
  } else {
    if (userEmail === transaction.sender) {
      transactionAmount = "-" + transaction.amount;
    } else {
      transactionAmount = "+" + transaction.amount;
    }
    transactionColor = "deposit";
    //transactionAmount = transaction.amount;
    transactionState = "done";
  }

  return (
    <div>
      <div
        className="movements__row"
        onClick={() => turnOnModal(transaction)}
        style={{ cursor: "pointer" }}
      >
        <div className={`movements__type movements__type--${transactionColor}`}>
          {transaction.cryptocurrency}
        </div>
        <div className="movements__value">{transactionState}</div>
        <div className="movements__value">{transactionAmount}</div>
      </div>
    </div>
  );
};

export default Transaction;
