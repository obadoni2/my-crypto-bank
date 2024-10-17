import {React, useState} from "react";
import APIService from "./APIService";
import {useNavigate} from "react-router-dom";

const RegistrationForm = () => {
    const [name, setName] = useState("");
    const [lname,setLame] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const[address, setAddress] = useState ("");
    const[role, setRole] = useState("");

    const navigate = useNavigate();

    const registerUser = () => {
        APIService.RegisterNewUser({
            name,
            lname,
            address,
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
                   type = "text"
                   placeholder="Enter your name"
                   value ={name}
                   onchange={(e) => setName(e.target.value)}
                   />
                   </div>
                   <div classNme="form-control">
                    <labe>Last name</labe>
                    <input 
                    type="text"
                    placeHolder="Enter your last name"
                    value={lname}
                    
                    onChange ={(e) => setEmail(e.target.value)}
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
                <label> Password</label>
                <input 
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.vlue)}
                />

            </div>
            <div className="form-control">
                <label> City </label>
                <input 
                type= "text"
                placeholder="Enter the city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                />


            </div>
            <label> Address</label>
            <div className="form-control">
            <input 
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e,target.value)}
            />
           </div>
           <div className= "form-control">
            <label>Role</label>
            <select id="userType" onChange={(e) => setRole(e.target.value)}>
            
            <option value="PUSER">Premium user</option>
            <option value="RUSER"> Regular user</option>
            </select>
           </div>
           <input type="submit" value="Registration" className="btn btn-block"/>
        </form>

    </div>
    );
};