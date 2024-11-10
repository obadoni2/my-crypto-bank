import React, { useState } from "react";
import httpClient from "../httpClient";
import { useNavigate, useLocation } from "react-router-dom";

const Verification = () => {
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState(false);
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state.email;
  const verifyUser = async () => {
    const resp = await httpClient.patch(
      "http://127.0.0.1:5000/auth/validateOTP",
      {
        otp,
        email,
      }
    );

    if (resp.data.verified === "true") {
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("role", resp.data.role);
      setLogged(true);
      if (localStorage.getItem("token")) {
        navigate("/mainPage");
      }
    } else {
      setErr(true);
      setOtp("");
    }
  };

  return (
    <div className="container">
      <label style={{ fontSize: "large" }}>
        Please eneter your verification code from your email
      </label>
      <form className="add-form">
        <div className="form-control">
          <input
            type="text"
            placeholder="Enter code here"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              setErr(false);
            }}
            required
          />
        </div>

        <button type="button" className="btn btn-block" onClick={verifyUser}>
          Verify
        </button>
        {err ? (
          <p
            style={{
              color: "red",
              marginTop: "3rem",
              textAlign: "center",
            }}
            className="welcome"
          >
            Failed to verify, try again pls
          </p>
        ) : null}
      </form>
    </div>
  );
};

export default Verification;
