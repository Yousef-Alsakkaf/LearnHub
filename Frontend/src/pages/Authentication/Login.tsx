import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { BiSun, BiMoon } from "react-icons/bi";
import '../../App.scss'
import { Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import socket from "../../socket";
import { useNavigate } from "react-router-dom";

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

const LoginPage = () => {
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const controls = useAnimation();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const handleAuthentication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      username: formData.username,
      password: formData.password,
    });

    socket.emit("authenticate", {
      username: formData.username,
      password: formData.password,
    });

    socket.on("authenticate-response", (response: UserData) => {
      if (response.type === "student") {
        console.log("entered");
        navigate("/student");
      } else if (response.type === "admin") {
        navigate("/admin");
      } else if (response.type === "instructor") {
        navigate("/instructor");
      }

      localStorage.setItem("accessToken", response.accessToken);
    });
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="App"
        data-theme={isDark ? "dark" : "light"}
      >
        <Container maxWidth="sm">
          <motion.div initial={{ opacity: 0, y: -50 }} animate={controls} transition={{ duration: 0.5 }}>
            <Typography variant="h4" gutterBottom color={isDark ? "whitesmoke" : ""}>
              Login
            </Typography>
            <form onSubmit={handleAuthentication}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                required
                sx={{
                  color: isDark ? "whitesmoke" : "",
                  background: isDark ? "#FFFFF0" : "",
                }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                sx={{
                  color: isDark ? "whitesmoke" : "",
                  background: isDark ? "#FFFFF0" : "",
                }}
              />

              <Button type="submit" variant="contained" color="primary" size="large" fullWidth style={{ marginTop: "20px" }}>
                Login
              </Button>
              <Box mt={2}>
                <Link to="#">Forgot Password?</Link>
              </Box>
              <Box mt={2}>
                <Typography variant="body2" color={isDark ? "whitesmoke" : "textSecondary"} align="center">
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </Typography>
              </Box>
            </form>
          </motion.div>
        </Container>
      </div>
      <Box
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 999,
        }}
      >
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isDark ? <BiSun size={24} color={isDark ? "#FFFFF0" : ""} /> : <BiMoon size={24} />}
        </button>
      </Box>
    </>
  );
};

export default LoginPage;
