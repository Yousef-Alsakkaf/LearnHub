import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Container, TextField, Typography, Box } from "@mui/material";
import { BiSun, BiMoon } from "react-icons/bi";
import "../../App.scss";
import { Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import socket from "../../socket";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image } from "lucide-react";
import ForgotPassword from "./forgotPassword";
import Login from "./Login";
import SignUp from "./Signup";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

interface UserData {
  UID: string;
  accessToken: string;
  active: number;
  email: string;
  fName: string;
  id: number;
  lName: string;
  password: string;
  type: string;
  username: string;
}

export function LoginPage() {
  const navigate = useNavigate();
  const [renderState, setRenderState] = useState("login");

  return (
    <div className="w-full lg:grid h-full items-center justify-center" style={{height: "100vh"}}>
      {renderState === "login" && <Login changeState={setRenderState}/>}
      {renderState === "signup" && <SignUp changeState={setRenderState}/>}
      {renderState === "forgot-password" && <ForgotPassword changeState={setRenderState}/>}
    </div>
  );
}

export default LoginPage;
