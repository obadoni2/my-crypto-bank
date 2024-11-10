import React from "react";
import httpClient from "../httpClient";

const BlockUser = ({ user, getUserList }) => {
  const blockUser = async () => {
    await httpClient.post(
      "http://127.0.0.1:5000/auth/blockUser",
      {
        userId: user.id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    getUserList();
  };
  return (
    <div>
      <div className="movements__row">
        <div className="movements__type movements__type--pending">
          {user.email}
        </div>
        <div className="movements__value">
          <label
            style={{ color: "black", cursor: "pointer" }}
            onClick={blockUser}
          >
            BLOCK
          </label>
        </div>
      </div>
    </div>
  );
};
export default BlockUser;



