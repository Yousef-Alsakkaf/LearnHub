// global.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/Authentication/Login";
import SignupPage from "../../pages/Authentication/Signup";

const Global = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
    </Router>
  );
};

export default Global;
