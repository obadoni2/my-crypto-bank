import React from "react";
import TransactionRequest from "./TransactionRequest";

const TransactionRequestLits = ({
    userTransactionRequests,
    turnOnModal,
    onRequestResolve,
    updateTransactions,
    showTransactions,

}) => {
    retuen (
        <div>
    {userTransactionRequests.map((transactionRequest, index) => (
        <TransactionRequest
        transactionRequest ={transactionRequest}
        key={index}
        turnOnModal = {turnOnModal}
        onRequestResolve ={onRequestResolve}
        updateTransactions ={updateTransactions}
        showTransactions = {showTransactions}
        />
      
    ))}
    </div>

    );
};
export default TransactionRequestLists;