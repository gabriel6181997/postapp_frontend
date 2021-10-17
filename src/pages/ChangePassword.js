import axios from "axios";
import { useState } from "react";

export const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangePassword = () => {
    axios.put(
      "http://localhost:3001/auth/changepassword",
      { oldPassword, newPassword },
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
    ).then((response)=> {
      if(response.data.error) {
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
