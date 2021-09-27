import axios from "axios";
import React, { useState } from "react"

export const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    const data = {username, password}
    axios.post("http://localhost:3001/auth/login", data).then((response)=> {
      console.log(response.data)
    })
  }

  return <div className="loginContainer">
    <input type="text" placeholder="username" onChange={handleUsername}/>
    <input type="password" placeholder="password" onChange={handlePassword}/>

    <button onClick={handleLogin}>Login</button>
  </div>;
};
