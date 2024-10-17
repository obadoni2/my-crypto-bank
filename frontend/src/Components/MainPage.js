import React, {userEffect, useState} from "react";
import httpClient from "../httpClient";
import{useNavigate} from "./CryptoAllList";
import CryptoAllList from "./CryptoAllList";
import BankingImport from "./BankImport";
import CurrencyExchange from "./CurrencyExchange";
import Transfer from "./Transfer";
import UserCryptoList from "./UserCryptoList";
import TransactionList from "./TransactionList";
import TransactionRequestList from "./TransactionRequestLists";
import CryptoGraphphs from "./CrytoGraphs"
import BlockUserList from "./BlockUserList";

const MainPage =({turnOnMOdal, turnonErromodal}) => {
    const navigate = useNavigate();

    const [toShow, setToShow] = useState("all");
    const [currencySymbols, setCurrencySymbols] = useState([]);
    const [currencySymbolsUsd, setCurrencySymbolsUsd] = useState([]);
    

    const[currencyAll, setCurrencyAll] = useState([]);
    const [userCryptoList, setUserCrypoList] = useState ([]);
    const[userTransactions, setUserTransactions] = useState([]);
    const[userEmail, setUserEmail] = useState("");
    const[userTransactionRequests, setuserTransactionRequest] = useState([]);


    //dependencies
    const [amountToBuy, setAmountToBuy] = useState(0); //za exchange
    const [transferAmount, setTransferAmount] = useState(0);
    const[userMoney, setUserMOney] = useState(0);


    const today = new Date();
    const date = 
      today.getDate() + "/" + (today.getMonth() +1) + "/" + today.getFullYear();

    const logOut = async () => {
        // await httpClient. post(http://127.0.0.1:500/logout");

        localStorage.clear();
        navigate ("/");
    };

    userEffect(() => {
        const getUserMoney = async () => {
            const resp = await httpClient("http://127.0.0.1:500/account/getMoney", {
            headers: {
                Authorization: "Bearer" + localStorage.getItem("token"),
                "Access-Control-Allow-origin": "*",

            },
            });

            setUserMOney(resp.data.value);
        };
         
        setUserMOney();
    }, [userMoney, amountToBuy]);
    
 userEffect(() => {
    const getUserCrypto = async () => {
      const resp = await httpClient.get(
        "http://127.0.0.1:500/acount/getCrypto",
        {
            header:{
                Authorization:"Bearer" + localStorage.getItem("token"),
                "Access-Control-Allow-origin": "*",
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
          header:{
            Authorization: "Bearer" + localStorage.getItem("token"),
            "Access-Control-allow-origin": "*"
          },

        }
      );
      const data =["USD", ...resp.data];
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
          header:{
            Authorization: "Bearer" + localStorage.getItem("token"),
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
      "http://127.0.0.1:5000/acount/getCrypto",
      {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },

      }
    );
    setUserCryptoList(resp.data);
  };

  const showBlockUserList = () => {
    setToShow("blockUserList");
  };
  const showTransactions = async () => {
    setToShow("transactions");
    const resp =await httpClient.get(
      "http://127.0.0.1:5000/transaction/getTransactions",
      {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
          "Access-Control-Allow-origin": "*",
        },
      }
    );
    setuserTransactRequests(resp.data);
      setToShow("graphs");
  
  };
  
  const ShowCryptoGrapha = () => {
    setToShow("graphs");
  };

  const onRequestResolve = (clickedReq) => {
    console.log(clickedReq);
    const newReq = userTransactionRequesusts.filter((req) => {
      return req.hasID !== clickedReq.hashID;
    });

    setuserTransactuinRequests(newReq);
  };

  const onAccept = async () => {
    const resp =await httpClient.get(
      "http://127.0.01:5000/transaction/getTransactuins",
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Access-ConTrol-Allow-Orign": "*",

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
      <p className="balance__data">
        AS of <span className="data">{data}</span>

      </p>
      </div>

      <p class Name="balance__value">{Math.round(userMoney)}$</p>
      <button className="btn" onClick={logOut}>
        logout
      </button>
      </div>

      <div className="movements">
        {toShow == "all" ? <CryptoAllList cryptoListList={currencyAll} /> : null}
        {toShow == "userCrypto" ? (
          <UserCryptoList 
            userCryptoList ={userCrytoList}
            currencyAll={currencyAll}
            />
        ) : null}
        {toShow == "tranaction " ?(
          <TransactiontionList 
            userTransactions = {userTransactions}
            userEmail = {userEmail}
            turnonModal={turnOnModal}
            />

        ): null}
        {toShow == "graphs" ? <CryptoGraphs/>: null}
        {toShow == "blockUserLIst" ? <BlockUserList/>:null}

      </div>
      <div className = "summary">
        <button className="btn btn--show" onClick={showCurrencyAll}>
          All currency
        </button>
        <button className="btn btn--show" onClick={showTransactions}>
          My transactions
        </button>
        <button className="btn btn--show" onClick={showUserCrypto}>
          My crypto
        </button>
        <button className ="btn btn--show" onClick={showTransactionRequest}>
          My transaction requests
        </button>
        {localStorage.getItem("role") == "PUSER" ?(
         <button className="btn btn--show" onClick={showCryptoGraphs}>
          Cryto charts
         </button>
        ): null}
        {localStorage.getItem("role") === "ADMIN" ? (
          <button className="btn btn--show" onClick={showBlockUserList}>
            Blockable users
          </button>
        ) : null}
      </div>
       <Transfer 
       currencySymbols = {currencySymbols}
       transferAmount = {transferAmount}
       setTransferAmount ={setTransferAmount}
       turnonErroModal = {turnOnErroModal}
       />

       <BanKImport userMoney = {userMoney} setUserMoney={setUserMoney} />
       <CurrencyExchange
        currencySymbolsUsd={currencySymbolsUsd}
        amountToBuy ={amountToBy}
        setAmountToBuy ={setAmountTOBuy}
        turnonErrModal = {turnOnErroModal}
        />

    </main>
  );

};

export default MainPage;