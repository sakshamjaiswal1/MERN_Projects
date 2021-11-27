import React from "react";
import "./login.css";
import { Cancel, Room } from "@material-ui/icons";

import axios from "axios";
import {axiosInstance }from "../config"
import { useRef, useState } from "react";

function Login({ setShowLogin, myStorage, setCurrUser }) {
  const [error, setError] = useState(false);
  const nameRef = useRef();

  const passwordRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,

      password: passwordRef.current.value,
    };
    try {
      const res = await axiosInstance.post("/users/login", user);
      myStorage.setItem("user", res.data.username);
      setCurrUser(res.data.username);
      setShowLogin(false);
      setError(false);
    } catch (err) {
      setError(true);

      console.log(err);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span style={{ color: "black" }}>Travel App</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" ref={nameRef} />

        <input type="password" placeholder="Password" ref={passwordRef} />
        <button className="loginButton">Login</button>

        {error && (
          <span className="failure"> Username or Password is incorrect</span>
        )}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}

export default Login;
