import React, { useEffect, useState } from "react";
import { userbase_url } from "../url";
import axios from "axios";
import Input from "../component/Input";
import Button from "../component/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/signup.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contextProvider/myContext";
import { useNavigate } from "react-router-dom";
function Signup() {
  const { setUserMail } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userSignupDetails, setUserSignupDetails] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    profileImage: null,
  });
  const { username, email, password, firstName, lastName, profileImage } =
    userSignupDetails;
  const formData = new FormData();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    formData.append("username", username);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profileImage", profileImage);
    setUserMail(email);
    localStorage.setItem("usermail", email);
    localStorage.setItem("profileImage", profileImage);
    try {
      let res = await axios.post(`${userbase_url}`, formData);
      if (res.status === 201) {
        localStorage.setItem("second", 59);
        localStorage.setItem("minute", 4);
        navigate("/otp");
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err.config);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSignupDetails({ ...userSignupDetails, [name]: value });
  };

  const handleChangeImage = (e) => {
    setUserSignupDetails({
      ...userSignupDetails,
      profileImage: e.target.files[0],
    });
  };

  return (
    <div className="signupContainer">
      <h1>signUp</h1>
      <form onSubmit={handleSubmit} className="signupForm">
        <Input
          onChange={handleChange}
          type="email"
          placeholder="please enter your valid email"
          label="email"
          Id={"InputEmail"}
          name="email"
          required
          value={userSignupDetails.email}
        />
        <Input
          onChange={handleChange}
          placeholder="enter your username"
          label="Username: "
          type="text"
          Id="InputUsername"
          name="username"
          required
          value={userSignupDetails.username}
        />
        <Input
          onChange={handleChange}
          placeholder="enter your first name"
          label="first name: "
          Id="InputfirstName"
          name="firstName"
          value={userSignupDetails.firstName}
        />
        <Input
          onChange={handleChange}
          placeholder="enter your last name"
          label="last name: "
          Id="InputlastName"
          name="lastName"
          value={userSignupDetails.lastName}
          required
        />
        <Input
          onChange={handleChange}
          placeholder="enter your  password"
          label="password: "
          Id="InputPassword"
          name="password"
          type="password"
          required
        />
        <Input
          onChange={handleChangeImage}
          type="file"
          label="image: "
          Id="inputImage"
          name="image"
        />
        <div className="alreadySignUp">
          <Link to="/Login">alreadySignUp</Link>
        </div>

        <span className="signUpBtn">
          {" "}
          <Button className="button-3"> signUp{loading && <span className="loader"></span>}</Button>
         
        </span>
      </form>
    </div>
  );
}

export default Signup;
