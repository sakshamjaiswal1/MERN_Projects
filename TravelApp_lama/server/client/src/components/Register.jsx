import React from "react";
import "./register.css";
import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";

function Register({setShowRegister}) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
try{
    await axios.post('/users/register',newUser)
    setSuccess(true)
    setError(false)
    nameRef.current.value=''
    emailRef.current.value=''
    passwordRef.current.value=''
}
catch(err){
    setError(true)
    setSuccess(false)
    console.log(err)
}
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span style={{ color: "black" }}>Travel App</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" ref={nameRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button className="registerButton">Register</button>
        {success && (
          <span className="success">
            {" "}
            Resistration Successfull! You can login now
          </span>
        )}
        {error && (
          <span className="failure">
            {" "}
            Something went wrong! Enter feilds carefully
          </span>
        )}
      </form>
      <Cancel className="registerCancel" onClick={()=>setShowRegister(false)} />
    </div>
  );
}

export default Register;
