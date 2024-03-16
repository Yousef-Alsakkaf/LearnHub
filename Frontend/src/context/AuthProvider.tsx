import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

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

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedAccessToken = localStorage.getItem("accessToken"); 
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedAccessToken) {
      setAccessToken(storedAccessToken); 
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

  const updateAccessToken = (accessToken: string | undefined) => {
    if (accessToken === undefined) {
      localStorage.removeItem("accessToken"); 
    } else {
      localStorage.setItem("accessToken", accessToken); 
    }
    setAccessToken(accessToken); 
  };

  return (
    <AuthContext.Provider value={{ username, accessToken, setUsername: updateUsername, setAccessToken: updateAccessToken }}>
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
