import axios from "axios";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

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
        localStorage.setItem("accessToken", response.data);
        setAuthState(true);
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
