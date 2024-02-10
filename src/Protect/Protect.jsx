import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contextProvider/myContext";
import { Navigate } from "react-router-dom";
function AfterLogin({ children }) {
  const { isUserLogin } = useContext(AuthContext);
  let lsAccessToken = localStorage.getItem("accessToken");
  if (isUserLogin || lsAccessToken) {
    return;
  }
  return children;
}

const UserLoggedIn = ({ children }) => {
  let lsAccessToken = localStorage.getItem("accessToken");
  const { isUserLogin } = useContext(AuthContext);
  if (isUserLogin || lsAccessToken) {
    return children;
  }
  return;
};

export { AfterLogin, UserLoggedIn };
