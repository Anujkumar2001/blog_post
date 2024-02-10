import React, { useEffect, useRef, useState } from "react";
import "../style/otp.css";
import { verify_mail, resend_otp } from "../url";
import { useContext } from "react";
import { AuthContext } from "../contextProvider/myContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function Otp() {
  const [focus, setFocus] = useState(false);
  const inputRefs = useRef([]);
  const [otpValue, setOtpValue] = useState(new Array(6).fill(""));
  const [disable, setDisable] = useState(true);
  const [otp, setOtp] = useState("");
  const [isResendOtp, setIsResendOtp] = useState(true);
  const lsUserMail = localStorage.getItem("usermail");
  const navigate = useNavigate();
  // verymail from otp ------------------------------
  const verifyOtp = async () => {
    console.log(otp, "otp value");
    try {
      const res = await axios.patch(verify_mail, {
        email: lsUserMail,
        otp: otp,
      });
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  // ------------------------------------------------
  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    verifyOtp();
  };
  const handleChange = (e, index) => {
    let value = e.target.value;
    if (isNaN(value)) {
      return;
    }
    let newOtp = [...otpValue];
    newOtp[index] = value.substring(value.length - 1);
    setOtpValue(newOtp);

    // automatic otp write ------------
    if (value && index < newOtp.length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
    setOtp(Number(newOtp.join("")));

    if (!newOtp.includes("")) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };
  // handlekey down -----------------
  const handleKeyDown = (e, index) => {
    if (e.code == "Backspace") {
      if (!otpValue[index] && index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // otp time countdown-------------

  const lsMinute = Number(localStorage.getItem("minute"));
  const lsSecond = Number(localStorage.getItem("second"));

  const [minutes, setMinutes] = useState(lsMinute);
  const [second, setSecond] = useState(lsSecond);

  // resendOtp button disable logic---
  const btnDisable = {
    opacity: "0.5",
    pointerEvents: "none",
    " cursor": "notAllowed",
  };

  // resend otp ------------
  const handleResendOtp = () => {
    resendOtp();
  };
  const resendOtp = async () => {
    try {
      const res = await axios.post(resend_otp, {
        email: lsUserMail,
      });
      if (res.status == 200) {
        setSecond(59);
        setMinutes(4);
        setIsResendOtp(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (second > 0) {
        localStorage.setItem("second", second - 1);
        setSecond((pre) => pre - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          localStorage.setItem("minute", minutes - 1);
          setSecond(59);
        } else {
          clearInterval(interval);
          localStorage.setItem("minute", 5);
          localStorage.setItem("second", 59);
          setIsResendOtp(false);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [second, minutes, resendOtp]);

  return (
    <div className="otpContainer">
      <h2>enter your Otp</h2>
      <div className="otpBox">
        <form className="otp" onSubmit={handleOtpSubmit}>
          <p id="otpTime">time:{minutes + ":" + second}</p>
          <div className="otpInput">
            {otpValue.map((value, index) => (
              <input
                key={index}
                type="text"
                value={otpValue[index]}
                ref={(input) => (inputRefs.current[index] = input)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => {
                  handleKeyDown(e, index);
                }}
                required
              />
            ))}
          </div>
          <p
            id="resendOtp"
            style={isResendOtp ? btnDisable : {}}
            disabled={isResendOtp}
            onClick={handleResendOtp}
          >
            resend otp
          </p>
          <button disabled={disable} className="button-3">
            submit otp
          </button>
        </form>
      </div>
    </div>
  );
}

export default Otp;
