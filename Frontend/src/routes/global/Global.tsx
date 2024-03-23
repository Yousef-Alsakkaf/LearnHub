// global.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/Authentication/LoginPage";
import SignupPage from "../../pages/Authentication/Signup";
import LogOut from "../logout";

const Global = () => {
  return (
    <>
      <Route path="/" element={<LoginPage />} />
      {/* <Route path="/signup" element={<SignupPage />} /> */}
      <Route path="/logout" element={<LogOut />}></Route>
    </>
  );
};

export default Global;
