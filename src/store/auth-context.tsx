import React, { FC, useState } from "react";
// import { TransferedData } from "../components/Authentication/Auth";

type AuthTypeContext = {
  isLoggedIn: boolean;
  token: string | null;
  expiresion: string | null;
  login: (token: string, expiresion: string) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthTypeContext>({
  isLoggedIn: false,
  token: "",
  expiresion: "",
  login: (token: string, expiresion: string) => {},
  logout: () => {},
});

type AuthProps = { children?: React.ReactNode };

const AuthContextProvider: FC<AuthProps> = ({ children }) => {
  const initialToken: string | null = localStorage.getItem("token");
  const [token, setToken] = useState<string | null>(initialToken);
  const [expiresion, setExpiresion] = useState<string | null>(null);
  const logoutHandler = () => {
    setToken(null);
    // setEmail(null);
    localStorage.removeItem("token");
  };

  const loginHandler = (token: string, expiresion: string) => {
    setToken(token);
    setExpiresion(expiresion);
    localStorage.setItem("token", token);

    // setTimeout(logoutHandler, 3000);
  };

  const userIsLoggedIn = !!token;
  const AuthValue: AuthTypeContext = {
    isLoggedIn: userIsLoggedIn,
    token: token,
    expiresion: expiresion,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>
  );
};
export default AuthContextProvider;
