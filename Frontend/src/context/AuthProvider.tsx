import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import socket from "../socket";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  username: string | undefined;
  accessToken: string | undefined;
  setUsername: (username: string | undefined) => void;
  setAccessToken: (accessToken: string | undefined) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }

    console.log("Authenticating with stored access token", storedAccessToken)

    socket.emit("authenticate", { accessToken: storedAccessToken });

    socket.on("authenticate-response", (response: any) => {
      if (response.type === "student") {
        navigate("/student");
      } else if (response.type === "admin") {
        navigate("/admin/users");
      } else if (response.type === "instructor") {
        navigate("/instructor");
      }

      setIsLogged(true);
    });

    return () => {
      socket.off("authenticate-response");
    };
  }, []);

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  }, [isLogged]);

  const updateUsername = (username: string | undefined) => {
    if (username === undefined) {
      localStorage.removeItem("username");
    } else {
      localStorage.setItem("username", username);
    }

    setUsername(username);
  };

  const updateAccessToken = (accessToken: string | undefined) => {
    if (accessToken === undefined) {
      localStorage.removeItem("accessToken");
    } else {
      localStorage.setItem("accessToken", accessToken);
    }

    setAccessToken(accessToken);
  };

  return <AuthContext.Provider value={{ username, accessToken, setUsername: updateUsername, setAccessToken: updateAccessToken }}>{isLogged ? children: ""}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
