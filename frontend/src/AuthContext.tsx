import React, { createContext, ReactNode, useState } from "react";
import {
  AUCTIONS_CLOSED,
  AUCTIONS_MINE,
  AUCTIONS_MY_BID,
  AUCTIONS_WON,
  HOME,
} from "./constants/routes";

type authContextType = {
  username: string;
  email: string;
  login: (username: string, email: string) => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  username: "",
  email: "",
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const login = (username: string, email: string) => {
    setUsername(username);
    setEmail(email);
  };

  const logout = () => {
    setUsername("");
    setEmail("");
    window.location.href = HOME;
  };

  const value = {
    username,
    email,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
