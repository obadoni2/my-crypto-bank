import React from "react";
import Transaction from "./Transaction";

const TransactionList = ({ userTransactions, userEmail, turnOnModal }) => {
  return (
    <div>
      {userTransactions.map((transaction, index) => (
        <Transaction
          transaction={transaction}
          key={index}
          userEmail={userEmail}
          turnOnModal={turnOnModal}
        />
      ))}
    </div>
  );
};

export default TransactionList;
