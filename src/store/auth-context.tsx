import React, { FC, useEffect, useState } from "react";
// import { TransferedData } from "../components/Authentication/Auth";

type AuthTypeContext = {
  isLoggedIn: boolean;
  token: string | null | undefined;
  login: (token: string, expiresion: string) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthTypeContext>({
  isLoggedIn: false,
  token: "",
  login: (token: string, expiresion: string) => {},
  logout: () => {},
});

type AuthProps = { children?: React.ReactNode };
let logoutTimer: any;
const calculateRemainingTime = (expirate: string | null) => {
  const currentTime = new Date().getTime();
  if (!expirate) {
    expirate = "0";
  }
  let expirationTime = new Date(expirate).getTime();

  const remainingTime = expirationTime - currentTime;

  console.log(remainingTime, currentTime, expirationTime);

  return remainingTime;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return { token: storedToken, duration: remainingTime };
};

const AuthContextProvider: FC<AuthProps> = ({ children }) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData?.token;
  }
  const [token, setToken] = useState<string | null | undefined>(initialToken);
  const logoutHandler = () => {
    setToken(null);
    // setEmail(null);
    localStorage.removeItem("token");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const loginHandler = (token: string, expirationTime: string) => {
    setToken(token);
    // setExpiresion(expiresion);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainTimer = calculateRemainingTime(expirationTime);
    console.log(remainTimer);

    logoutTimer = setTimeout(logoutHandler, remainTimer);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData]);

  const userIsLoggedIn = !!token;
  const AuthValue: AuthTypeContext = {
    isLoggedIn: userIsLoggedIn,
    token: token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>
  );
};
export default AuthContextProvider;
