import React from "react";

const CryptoAll = ({currency}) => {
    return (
        <div>
            <div className="movements_row">
                <div className= "movements__type moveMents__type--deposit">
                    {currency.name} ({currency.symbol})

                </div>
                <div className = "movements__value">{currency.value.toFixed(3)}$</div>
            </div>
        </div>
    );
};
export default CryptoAll;