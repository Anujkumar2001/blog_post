import React, { useEffect } from "react";
import Input from "../component/Input";
import "../style/profile.css";
function Profile() {
  const { email, firstName, lastName, username, profileImage } = JSON.parse(
    localStorage.getItem("profileDetails")
  );
  console.log(profileImage);
  return (
    <div className="profileContainer">
      <div className="profileContent">
        <img src={profileImage} alt="error" className="profileImage" />
        <div className="profileDetails">
          <h3>Name:{firstName + " " + lastName}</h3>
          <h3>Email:{email}</h3>
          <h3>UserName:{username}</h3>
        </div>
      </div>
    </div>
  );
}

export default Profile;
