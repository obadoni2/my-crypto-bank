import React from "react";

const Transaction =({transaction, userEmail, turnOnModal}) => {
    let transactionAmount;
    let transactionColor;
    let transactionState;

    if (transaction.state == "REJECTED") {
        transactionColor = "withdrawal";
        transactionAmount = "REJECTED";
    } else if (
        transaction.state === "IN_PROGRESS" ||
        transactionColor.sate === "WAITING_FOR_USER"

    ) {
        transactionColor = "Progress";
        if(userEmail == transaction.sender) {
            transactionAmount = "+" transaction.amount;


        }else{
            transactionAmount = "+" + transaction.amount
        }
        transactionState = "mining";
    }else{
        if (userEmail == transaction.sender) {
            transactionAmount = "_" + transaction.amount;
        }else{
            transactionAmount = "+" + transaction.amount;
        }
        transactionColor = "deposit";
        // transactionAmount = transaction.amount;
        transactionState = "done";
    }

    return (
        <div>
            <div
            className= "movement__row"
            onClick={() => turnOnModal(Transaction)}
            style={{cursor:"pointer"}}
            >
                <div className={`movements___type  movements__type--${transactionColor}`}>
                    {transaction.crytocurrency}

                </div>
                <div className="movements__value">{transactionState}</div>
                <div className="movements__value">{transactionAmount}</div>
            </div>
        </div>
    );
};

export default Transaction;