import React from "react";
import UserCrypto from "./UserCrypto";

const UserCryptoList = ({ userCryptoList, currencyAll }) => {
  return (
    <div>
      <div>
        {userCryptoList.map((currency, index) => (
          <UserCrypto
            userCrypto={currency}
            key={index}
            currencyAll={currencyAll}
          />
        ))}
      </div>
    </div>
  );
};

export default UserCryptoList;
