import { React, useState } from "react";
import APIService from "./APIService";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const registerUser = () => {
    APIService.RegisterNewUser({
      name,
      lname,
      address,
      password,
      email,
      phoneNum,
      country,
      city,
      role,
    });

    navigate("/");
  };

  return (
    <div className="container">
      <form action="" className="add-form" onSubmit={registerUser}>
        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Last name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Phone number</label>
          <input
            type="text"
            placeholder="Enter your number"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Country</label>
          <input
            type="text"
            placeholder="Enter your country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>City</label>
          <input
            type="text"
            placeholder="Enter the city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Role</label>
          <select id="usertype" onChange={(e) => setRole(e.target.value)}>
            <option>Choose option</option>
            <option value="PUSER">Premium user</option>
            <option value="RUSER">Regular user</option>
          </select>
        </div>

        <input type="submit" value="Register" className="btn btn-block" />
      </form>
    </div>
  );
};

export default RegistrationForm;
