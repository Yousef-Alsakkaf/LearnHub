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
import { BiSun, BiMoon } from "react-icons/bi";
import {
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";
import '../App.scss'
import useLocalStorage from "use-local-storage";

const SignupPage = () => {
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const controls = useAnimation();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(formData);
    // Perform signup logic here
  };

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

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
            <Typography variant="h4" gutterBottom>
              Sign Up
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
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                margin="normal"
                required
              />
              <Box display="flex" justifyContent="space-between" mt={2}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <GoogleLoginButton onClick={() => console.log("Sign up with Google")} text="Sign up with Google" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <GithubLoginButton onClick={() => console.log("Sign up with GitHub")} text="Sign up with GitHub" />
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
                Sign Up
              </Button>
              <Box mt={2}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  Already have an account?{" "}
                  <Link href="/" variant="body2">
                    Login
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
          {isDark ? <BiSun size={24} /> : <BiMoon size={24} />}
        </button>
      </Box>
    </>
  );
};

export default SignupPage;