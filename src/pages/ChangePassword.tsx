import axios from "axios";
import { useState } from "react";
import { ChangeEvent } from "react-router/node_modules/@types/react";
import { API_URL } from "../api/endpoint";

export const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleOldPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleChangePassword = () => {
    axios
      .put(
        `${API_URL}/auth/changepassword`,
        { oldPassword, newPassword },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }
      });
  };

  return (
    <div>
      <h1>Change Your Password</h1>
      <input
        type="text"
        placeholder="Old Password..."
        onChange={handleOldPassword}
      />
      <input
        type="text"
        placeholder="New Password..."
        onChange={handleNewPassword}
      />
      <button onClick={handleChangePassword}>Save Changes</button>
    </div>
  );
};
