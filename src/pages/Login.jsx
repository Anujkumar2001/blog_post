import React, { useEffect, useState } from "react";
import { userbase_url } from "../url";
import Input from "../component/Input";
import Button from "../component/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../contextProvider/myContext";
import { useNavigate } from "react-router-dom";
import "../style/login.css";
function Login() {
  let [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setAccessToken, setIsUserLogin, setRefreshToken, setProfileImg } =
    useContext(AuthContext);
  const navigate = useNavigate();
  //handleSubmit -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${userbase_url}/login`, userLogin);
      console.log(response, "login response");
      if (response.data.data.user.isEmailVarified == false) {
        setLoading(false);
        navigate("/otp");
        localStorage.setItem("second", 59);
        localStorage.setItem("minute", 4);
        localStorage.setItem("usermail", userLogin.email);
      } else if (response.data && response.data.statusCode == 200) {
        toast.success("login successfully");
        navigate("/");
        setIsUserLogin(true);
        setProfileImg(response.data.data.user.profileImage);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        localStorage.setItem(
          "profileImage",
          response.data.data.user.profileImage
        );
        localStorage.setItem(
          "profileDetails",
          JSON.stringify(response.data.data.user)
        );
      }
    } catch (err) {
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  //handleChange------------------
  const handleChange = (e) => {
    let name = e.target.name;
    setUserLogin({ ...userLogin, [name]: e.target.value });
  };

  return (
    <div className="loginContainer">
      <h2>login page</h2>
      <form onSubmit={handleSubmit} className="loginForm">
        <Input
          type="email"
          placeholder="please enter your valid email"
          label="email"
          name="email"
          required
          onchange={handleChange}
        />
        <Input
          type="password"
          placeholder="please enter your password"
          label={"password"}
          onchange={handleChange}
          name="password"
          required
        />
        <span className="loginBtn">
          <Button className="button-3">
            {loading ? "loading..." : "login"}
          </Button>
        </span>
      </form>
    </div>
  );
}

export default Login;
