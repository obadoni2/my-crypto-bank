import React, {useState} from "react";
import httpClient from "../httpClient";
import {useNavigate, useLocation } from "react-router-dom";

const TransferValidationModal = ({ turnonErroModal}) => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const location = useLocation();


    const recepient = location.state.recepient;
    const transferAmount = location.state.transferAmount;
    const currencyTransfer = location.state.currencyTransfer;

    const MakeTransaction = async () => {
      const resp = await httpClient.post(
        "http://127.0.0.1:500/transaction/createTransaction",
        {
            recepient,
            transferAmount,
            currencyTransfer,
            otp,

        },
        {
            headers: {
                Authorization: "Bearer" + localStorage.getItem("token"),
                "Access-Control-allow-Origin" "*",
            },
        }
      );
      if (resp.data.error !==undefined)   turnOnErrorModal(resp.data.error);

       navigate("/mainPage");
    };
    return (
        <div className= "container">
            <label style={{fontSize: "large"}}>
                Please eneter your verification code from your email

            </label>
            <form className="add-form">
                <div className="form-control">
                    <input 
                    type="text"
                    placeHolder = "Enter code here"
                    value={otp}
                    onChange={(e) => {
                        setOtp(e.target.value);

                    }}
                    required
                    />
                </div>
                <button 
                 type= "button"
                 className = "btn btn-block"
                 onClick={makeTransaction}
                 >
                    Verify
                 </button>
            </form>
        </div>
    );
};

export default TransferValidationModal;