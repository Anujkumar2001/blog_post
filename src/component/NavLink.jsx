import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import "../style/navbar.css";
import { AfterLogin, UserLoggedIn } from "../Protect/Protect";
import { useContext } from "react";
import { AuthContext } from "../contextProvider/myContext";
function NavLink({ toogleClick }) {
  const { profileImg } = useContext(AuthContext);
  const lsProfileImg = localStorage.getItem("profileImage");
  return (
    <ul>
      <li
        onClick={() => {
          toogleClick();
        }}
      >
        <Link to={"/"}>home</Link>
      </li>
      <AfterLogin>
        <li
          onClick={() => {
            toogleClick();
          }}
        >
          <Link to={"/signup"}>signup</Link>
        </li>
      </AfterLogin>
      <AfterLogin>
        <li
          onClick={() => {
            toogleClick();
          }}
        >
          <Link to={"/login"}>login</Link>
        </li>
      </AfterLogin>
      <UserLoggedIn>
        <li
          onClick={() => {
            toogleClick();
          }}
        >
          <Link to={"/post"}>post</Link>
        </li>
      </UserLoggedIn>
      <UserLoggedIn>
        <li
          onClick={() => {
            toogleClick();
          }}
        >
          <Link to={"/profile"}>Profile</Link>
        </li>
      </UserLoggedIn>
      <UserLoggedIn>
        <li
          onClick={() => {
            toogleClick();
          }}
        >
          <Link to={"/create-post"}>creat-post</Link>
        </li>
      </UserLoggedIn>
      <UserLoggedIn>
        <li
          onClick={() => {
            toogleClick();
          }}
        >
          {" "}
          <Logout />
        </li>
      </UserLoggedIn>
      <UserLoggedIn>
        <li
          onClick={() => {
            toogleClick();
          }}
        >
          <img
            src={profileImg || lsProfileImg}
            alt=""
            className="profileIcon"
          />
        </li>
      </UserLoggedIn>
    </ul>
  );
}

export default NavLink;
