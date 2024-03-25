import React, { useState } from "react";
import Settings from "../../../templates/settings/Settings";
import socket from "../../../socket";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate()
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newpasswordConfirm, setConfirmPassword] = useState("");
  const changePass = () => {
    console.log("This is what the request change pass get ", {
      oldPassword: oldPassword,
      newPassword: newPassword,
      newpasswordConfirm: newpasswordConfirm,
    });
    socket.emit("change-password", {
      oldPassword: oldPassword,
      newPassword: newPassword,
      newpasswordConfirm: newpasswordConfirm,
    });
    socket.on("change-password-response", () => {

      navigate('/')
    });
  };
  return (
    <Settings>
      <div className="pt-4">
        <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
        <p className="font- text-slate-600">
         Please refer here in case you wanna check you profile info
        </p>
      </div>
      
      
      <hr className="mt-4 mb-8" />
      <p className="py-2 text-xl font-semibold">Password</p>
      <div className="flex items-center">
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
          <label htmlFor="login-password">
            <span className="text-sm text-gray-500">Current Password</span>
            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
              <input
                type="password"
                id="login-password"
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="***********"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
          </label>
          <label htmlFor="login-password">
            <span className="text-sm text-gray-500">New Password</span>
            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
              <input
                type="password"
                id="login-password"
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="***********"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </label>
          <label htmlFor="login-password">
            <span className="text-sm text-gray-500">Confirm Password</span>
            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
              <input
                type="password"
                id="login-password"
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="***********"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </label>
        </div>
      </div>
      
      <button 
      className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
      onClick={changePass}
      >
        Save Password
      </button>
      <hr className="mt-4 mb-8" />

      
    </Settings>
  );
}

export default Account;
