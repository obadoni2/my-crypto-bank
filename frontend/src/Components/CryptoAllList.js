import React from "react";
import CryptoAll from "./CryptoAll";

const CryptoAllList =({crytoList})  => {
return(
    <div> 
        {crypto.map(({currency, index}) =>  (
          <CryptoAll currency={currency} key={index} />

        ))}
    </div>

);
        }