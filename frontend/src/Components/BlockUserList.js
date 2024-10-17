import {React, useState, useEffect} from "react";
import httpClient from "../httpClient";
import BlockUser from "./BlockUser";

const BlockUserList = () => {
    const [userList, setUserList] = useState([]);

    const getUserList = async () => {
        const resp = await httpClient.get(
            "http://127.0.0.1:500/auth/getBlockableUser",
            {
                headers:{
                    Authorization: "Bearer" + localStorage.getItem("token"),
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
        setUserList(resp.data);

    };
    userEffect(() => {
        getUserList();
    },[]);

    return (
        <div> 
            {userList.map((user, index)=> (
                <BlockUser user={user} key={index} getUserList ={getUserList} />

            ))}
        </div>
    );
};

export default BlockUserList;