import React from "react";

const UserCrypto =({ userCrypto, currencyAll}) => {
    let price = 0;
 currencyAll.forEach((element) => {
    if (element.symbol == userCrypto.name) {
        price = element.value;
    }
 });

 return(
    <div>
        <div className="movements__row">
            <div className="movements__type movement__type--deposit">
                {userCrypto.name}

            </div>
            <div className="movements__value">{userCrypto.amount.toFixed(3)}</div>
            <div className ="movements__value">
                {(userCrypto.amount * price). toFixed(3)} $
            </div>
        </div>
    </div>
 );
};

export default UserCrypto;
