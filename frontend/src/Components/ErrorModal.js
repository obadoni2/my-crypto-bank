import React from "react";

const ErrorModal = ({ turnOffErrorModal, errorModalData }) => {
  return (
    <div>
      <div className="modal ">
        <button className="close-modal" onClick={turnOffErrorModal}>
          &times;
        </button>
        <h1 style={{ color: "red" }}>{errorModalData}</h1>
      </div>
      <div className="overlay hidden"></div>
    </div>
  );
};

export default ErrorModal;
