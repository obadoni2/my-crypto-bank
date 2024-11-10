import React from "react";
import TransactionRequest from "./TransactionRequest";

const TransactionRequestLits = ({
  userTransactionReqeusts,
  turnOnModal,
  onRequestResolve,
  updateTransactions,
  showTransactions,
}) => {
  return (
    <div>
      {userTransactionReqeusts.map((transactionRequest, index) => (
        <TransactionRequest
          transactionRequest={transactionRequest}
          key={index}
          turnOnModal={turnOnModal}
          onRequestResolve={onRequestResolve}
          updateTransactions={updateTransactions}
          showTransactions={showTransactions}
        />
      ))}
    </div>
  );
};

export default TransactionRequestLits;
