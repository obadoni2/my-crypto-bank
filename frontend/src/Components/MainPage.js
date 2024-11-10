import React, { useEffect, useState } from "react";
import httpClient from "../httpClient";
import { useNavigate } from "react-router-dom";
import CryptoAllList from "./CryptoAllList";
import BankImport from "./BankImport";
import CurrencyExchange from "./CurrencyExchange";
import Transfer from "./Transfer";
import UserCryptoList from "./UserCryptoList";
import TransactionList from "./TransactionList";
import TransactionRequestLits from "./TransactionRequestLits";
import CryptoGraphs from "./CryptoGraphs";
import BlockUserList from "./BlockUserList";

const MainPage = ({ turnOnModal, turnOnErroModal }) => {
  const navigate = useNavigate();

  const [toShow, setToShow] = useState("all");
  const [currencySymbols, setCurrencySymbols] = useState([]);
  const [currencySymbolsUsd, setCurrencySymbolsUsd] = useState([]);

  const [currencyAll, setCurrencyAll] = useState([]);
  const [userCryptoList, setUserCryptoList] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userTransactionReqeusts, setuserTransactionReqeusts] = useState([]);

  //dependencies
  const [amountToBuy, setAmountToBuy] = useState(0); //za exchange
  const [transferAmount, setTransferAmount] = useState(0);
  const [userMoney, setUserMoney] = useState(0);

  const today = new Date();
  const date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  const logOut = async () => {
    //await httpClient.post("http://127.0.0.1:5000/logout");
    localStorage.clear();
    navigate("/");
  };

  const updateTransactions = (newTransaction) => {
    setUserTransactions([...userTransactions, newTransaction]);
  };

  useEffect(() => {
    const getUserMoney = async () => {
      const resp = await httpClient("http://127.0.0.1:5000/account/getMoney", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
      });

      setUserMoney(resp.data.value);
    };

    getUserMoney();
  }, [userMoney, amountToBuy]);

  useEffect(() => {
    const getUserCrypto = async () => {
      const resp = await httpClient.get(
        "http://127.0.0.1:5000/account/getCrypto",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      setUserCryptoList(resp.data);
    };

    getUserCrypto();
  }, [amountToBuy]);

  useEffect(() => {
    const getUserTransactions = async () => {
      const resp = await httpClient.get(
        "http://127.0.0.1:5000/transaction/getTransactions",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      setUserTransactions(resp.data);
    };

    getUserTransactions();
  }, [transferAmount]);

  // useEffect(() => {
  //   const getTransactionRequests = async () => {
  //     const resp = await httpClient.get(
  //       "http://127.0.0.1:5000/transaction/getTransactionRequests"
  //     );

  //     setuserTransactionReqeusts(resp.data);
  //   };

  //   getTransactionRequests();
  // }, []);

  useEffect(() => {
    const getUserEmail = async () => {
      const resp = await httpClient.get("http://127.0.0.1:5000/auth/@me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
      });
      setUserEmail(resp.data.email);
    };

    getUserEmail();
  }, [userTransactions]);

  useEffect(() => {
    const getSymbol = async () => {
      const resp = await httpClient.get(
        "http://127.0.0.1:5000/crypto/showCryptoSymbols",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const data = ["USD", ...resp.data];
      setCurrencySymbols(resp.data);
      setCurrencySymbolsUsd(data);
    };

    getSymbol();
  }, []);

  useEffect(() => {
    const getCurrencyAll = async () => {
      const resp = await httpClient.get(
        "http://127.0.0.1:5000/crypto/showCrypto_all",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      setCurrencyAll(resp.data);
    };

    getCurrencyAll();
  }, []);

  const showUserCrypto = async () => {
    setToShow("userCrypto");
    const resp = await httpClient.get(
      "http://127.0.0.1:5000/account/getCrypto",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    setUserCryptoList(resp.data);
  };

  const showCurrencyAll = () => {
    setToShow("all");
  };

  const showBlockUserList = () => {
    setToShow("blockUserList");
  };

  const showTransactions = async () => {
    setToShow("transactions");
    const resp = await httpClient.get(
      "http://127.0.0.1:5000/transaction/getTransactions",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    setUserTransactions(resp.data);
  };

  const showTransactionRequests = async () => {
    const resp = await httpClient.get(
      "http://127.0.0.1:5000/transaction/getTransactionRequests",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    setuserTransactionReqeusts(resp.data);
    setToShow("requests");
  };

  const showCryptoGraphs = () => {
    setToShow("graphs");
  };

  const onRequestResolve = (clickedReq) => {
    console.log(clickedReq);
    const newReq = userTransactionReqeusts.filter((req) => {
      return req.hashID !== clickedReq.hashID;
    });

    setuserTransactionReqeusts(newReq);
  };

  const onAccept = async () => {
    const resp = await httpClient.get(
      "http://127.0.0.1:5000/transaction/getTransactions",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    setUserTransactions(resp.data);
  };

  return (
    <main className="app">
      <div className="balance">
        <div>
          <p className="balance__label">Current balance</p>
          <p className="balance__date">
            As of <span className="date">{date}</span>
          </p>
        </div>
        <p className="balance__value">{Math.round(userMoney)}$</p>
        <button className="btn" onClick={logOut}>
          logout
        </button>
      </div>
      <div className="movements">
        {toShow === "all" ? <CryptoAllList cryptoList={currencyAll} /> : null}
        {toShow === "userCrypto" ? (
          <UserCryptoList
            userCryptoList={userCryptoList}
            currencyAll={currencyAll}
          />
        ) : null}
        {toShow === "transactions" ? (
          <TransactionList
            userTransactions={userTransactions}
            userEmail={userEmail}
            turnOnModal={turnOnModal}
          />
        ) : null}
        {toShow === "requests" ? (
          <TransactionRequestLits
            userTransactionReqeusts={userTransactionReqeusts}
            turnOnModal={turnOnModal}
            onRequestResolve={onRequestResolve}
            updateTransactions={updateTransactions}
            showTransactions={onAccept}
          />
        ) : null}
        {toShow === "graphs" ? <CryptoGraphs /> : null}
        {toShow === "blockUserList" ? <BlockUserList /> : null}
      </div>
      <div className="summary">
        <button className="btn btn--show" onClick={showCurrencyAll}>
          All currency
        </button>
        <button className="btn btn--show" onClick={showTransactions}>
          My transactions
        </button>
        <button className="btn btn--show" onClick={showUserCrypto}>
          My crypto
        </button>
        <button className="btn btn--show" onClick={showTransactionRequests}>
          My transaction requests
        </button>
        {localStorage.getItem("role") === "PUSER" ? (
          <button className="btn btn--show" onClick={showCryptoGraphs}>
            Crypto charts
          </button>
        ) : null}
        {localStorage.getItem("role") === "ADMIN" ? (
          <button className="btn btn--show" onClick={showBlockUserList}>
            Blockable users
          </button>
        ) : null}
      </div>

      <Transfer
        currencySymbols={currencySymbols}
        transferAmount={transferAmount}
        setTransferAmount={setTransferAmount}
        turnOnErroModal={turnOnErroModal}
      />
      <BankImport userMoney={userMoney} setUserMoney={setUserMoney} />
      <CurrencyExchange
        currencySymbolsUsd={currencySymbolsUsd}
        amountToBuy={amountToBuy}
        setAmountToBuy={setAmountToBuy}
        turnOnErroModal={turnOnErroModal}
      />
    </main>
  );
};

export default MainPage;
