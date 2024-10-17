import React from "react";
import Transaction from "./Transaction";

const TransactionList = ({userTransactions, userEmail, turnOnModal}) => {
return (
    <div>
        {userTransaction.map((transaction,index) => (
            <Transaction 
            transactions={transaction}
            key ={index}
            userEmail ={userEmail}
            turnOnModel ={turnOnModal}
            />

        
        ))}
    </div>
);
        }