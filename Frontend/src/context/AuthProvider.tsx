import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextProps {
  username: string | undefined;
  password: string | undefined;
  setUsername: (username: string | undefined) => void;
  setPassword: (password: string | undefined) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);

  const updateUsername = (username: string | undefined) => {
    if (username === undefined) {
      localStorage.removeItem("username");
    } else {
      localStorage.setItem("username", username);
    }
    setUsername(username);
  };

  const updatePassword = (password: string | undefined) => {
    if (password === undefined) {
      localStorage.removeItem("password");
    } else {
      localStorage.setItem("password", password);
    }
    setPassword(password);
  };

  return (
    <AuthContext.Provider value={{ username, password, setUsername: updateUsername, setPassword: updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
