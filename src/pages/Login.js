import axios from "axios";
import React, { useState } from "react";
import {useHistory} from "react-router-dom"

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    const data = { username, password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data);
        history.push("/");
      }
    });
  };

  return (
    <div className="loginContainer">
      <input type="text" placeholder="username" onChange={handleUsername} />
      <input type="password" placeholder="password" onChange={handlePassword} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
