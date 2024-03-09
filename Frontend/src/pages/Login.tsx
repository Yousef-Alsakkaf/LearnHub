import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from "@mui/material";
import {
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";
import { BiSun, BiMoon } from "react-icons/bi"; 
import '../App.scss'
import useLocalStorage from "use-local-storage";

const LoginPage = () => {
    const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const controls = useAnimation();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(formData);
  };

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const handleGoogleLogin = () => {
    console.log("Login with Google");
  };

  const handleGitHubLogin = () => {
    console.log("Login with GitHub");
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
        className="App" data-theme={isDark ? "dark" : "light"}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={controls}
            transition={{ duration: 0.5 }}
          >
            <Typography
             variant="h4" 
             gutterBottom
             color={isDark ? "whitesmoke" : ""}
             >
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
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
              <Box display="flex" justifyContent="center" mt={2}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ width: '100%' }}
                >
                  <GoogleLoginButton onClick={handleGoogleLogin} />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ width: '100%' }}
                >
                  <GithubLoginButton onClick={handleGitHubLogin} />
                </motion.div>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                style={{ marginTop: "20px" }}
              >
                Login
              </Button>
              <Box mt={2}>
                <Link href="#" variant="body2">
                  Forgot Password?
                </Link>
              </Box>
              <Box mt={2}>
                <Typography
                  variant="body2"
                  color={isDark ? "whitesmoke" : "textSecondary"}
                  align="center"
                >
                  Don't have an account?{" "}
                  <Link href="signup" variant="body2">
                    Sign Up
                  </Link>
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
          {isDark ? <BiSun size={24} color={isDark ? "#FFFFF0" : ""}/> : <BiMoon size={24} />}
        </button>
      </Box>
    </>
  );
};

export default LoginPage;
