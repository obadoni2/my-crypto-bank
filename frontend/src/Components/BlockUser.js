import React from "react";
import httpClient from "../httpClient";

const BlockUser = ({user, getUserList}) => {
    const blockUser = async () => {
        await httpClient.post(
            "http://127.0.0.1:500/auth/blockUser",
            {
                userId: user.id,

            },
        {
            header:{
                Authorization:"Bearer" + localStorage.getItem("token"),
                "Access-Control-Allow-Origin": "*",
            },

        }
        );
        getUserList();
    };
    return(
        <div> 
            <div className = "movement__row">
                <div className = "movement__type movements__type--pending">
                    {user.email}
                </div>
                <div className="movement__value"> 
                <label
                 style={{color:"black", cursor: "pointer"}}
                 onClick ={blockUser}
                 >
                    BLock
                 </label>
                </div>
            </div>
        </div>
    );
};
export default BlockUser;