import React, {useState} from "react";
import httoClient from "../httpClient";

const CurrencyExchange = ({
    currencySymbolsUsd,
    amountToBuy,
    setAmountToBuy,
    turnOnErroModal,

}) =>{

    //const [amountToBuy, setAmountBuy] = useState(0);
    const [currencyBuy, setCurrencyBuy] = useState("USD");
    const [currencySell, setCurrencySell] = useState("USD");

    const exChangeCurrency = async () => {
        const resp = await httpClient.path(
            "http://127.0.0.1:5000/crypto/exchange",
            {
                currencySell,
                currencyBuy,
                amountToBuy,
            },
            {
                headers: {
                    AuthoriZation: "Bearer" + localStorage.getItem("token"),
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );

        setAmountToBuy(0);
        setCurrencySell("USD");
        setCurrencyBuy("USD");

        if (resp.data.error !== undefined) {
            turnOnErroModal(resp.data.error);
        }
    };
    return (
        <div>
            <div className="operation operation--close">
                <h2> Currency exchange</h2>
                <form className="form form--close">
                    <input 
                    type = "number"
                    min = "0"
                    className= "form__input form__input--to"
                    value ={amountToBuy}
                    onChange={(e) => {
                        setAmountToBuy(e.target.value);
                    }}
                    />
                    <select 
                    name="currency"
                    classname="form__input form__input--to"
                    value={currencyBuy}
                    onChange={(e) => {
                        setCurrencyBuy(e.target.value);
                    }}
                    >
                        {currencySymbolsUsd.map((symbol, index) => (
                            <option key={index}>{symbol}</option>

                        ))}
                    </select>
                    <select 
                    name="currency"
                    className="form__input form__input--to"
                    value={currencySell}
                    onChange={(e) => {
                        setCurrencySell(e.target.value);
                    }}
                    >
                        {currencySymbolsUsd.map((symbol, index) => (
                            <optio key={index}>{symbol}</optio>
                        ))}
    
                    </select>
                    <button 
                    type ="button"
                    className="form__btn  form__btn--close"
                    onClick={exchangeCurrency}
                    >
                        &rarr;

                    </button>
                    <label className="form__label">Amount to buy</label>
                    <label className="form__label">Buy </label>
                    <label className="form__label">Sell</label>
                </form>
            </div>
        </div>
    );
};


export default CurrencyExchange;