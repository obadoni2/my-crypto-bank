import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import httpClient from "../httpClient";

const LandingNav = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const logInUser = async () => {
    const resp = await httpClient.post("http://127.0.0.1:5000/auth/login", {
      email,
      password,
    });

    console.log(resp.data);
    if (resp.data.error === "Unauthorized") setErr(true);
    else navigate("/verification", { state: { email: email } });

    

    setEmail("");
    setPassword("");
  };
  return (
    <nav>
      <p className="welcome">Log in to get started</p>
      <form className="login">
        {err ? (
          <p style={{ color: "red", marginRight: "3rem" }} className="welcome">
            Invalid credentials
          </p>
        ) : null}

        <input
          type="text"
          placeholder="email"
          className="login__input login__input--user"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErr(false);
          }}
        />

        <input
          type="password"
          placeholder="password"
          className="login__input login__input--pin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className="login__btn"
          onClick={() => logInUser()}
        >
          &rarr;
        </button>
      </form>
    </nav>
  );
};

export default LandingNav;
