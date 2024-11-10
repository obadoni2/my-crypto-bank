import React from "react";

const ModalWindow = ({ turnOff, modalTransaction }) => {
  return (
    <div>
      <div className="modal ">
        <button className="close-modal" onClick={turnOff}>
          &times;
        </button>
        <h1>Sender: {modalTransaction.sender}</h1>
        <h1>Recipient: {modalTransaction.recipient}</h1>
        <h1>State: {modalTransaction.state}</h1>
        <h1>
          Amount: {modalTransaction.amount} {modalTransaction.cryptocurrency}
        </h1>
      </div>
      <div className="overlay hidden"></div>
    </div>
  );
};

export default ModalWindow;
