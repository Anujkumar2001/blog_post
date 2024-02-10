import React, { createContext, useState } from "react";
const AuthContext = createContext();
function MyContext({ children }) {
  const [accessToken, setAccessToken] = useState("");
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [userMail, setUserMail] = useState("");
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        isUserLogin,
        setIsUserLogin,
        refreshToken,
        setRefreshToken,
        profileImg,
        setProfileImg,
        setUserMail,
        userMail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext };
export default MyContext;
