import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/logut.css";
import { AuthContext } from "../contextProvider/myContext";
import { useContext } from "react";
import { toast } from "react-toastify";
function Logout() {
  const { setIsUserLogin, setProfileImg } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("profileImage");
    setIsUserLogin(false);
    navigate("/login");
    toast("logout succesfull");
    setProfileImg("");
  };
  return (
    <li onClick={handleLogout} style={{ cursor: "pointer" }}>
      Logout
    </li>
  );
}

export default Logout;
