import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./ResetPassword.css";
import { useSubmitresetPasswordMutation } from "../../Redux/api/userApi";
import AnimatedPage from "../Login/AnimatedPage";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import ResetImage from "../../assets/Loginimg/illustration-forget.svg";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (!storedEmail) {
      toast.error("Session expired. Please request a new OTP.");
      navigate("/forgot-password");
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);
  // console.log("email", email);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [submitResetpassword] = useSubmitresetPasswordMutation();
  
  const handleResetPassword = async (e) => {
    let toastid = toast.loading("loading...");
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      toast.dismiss(toastid);
      return;
    }
    await submitResetpassword({ email, password });
    navigate("/login");
    toast.dismiss(toastid);
    toast.success("reset-passwrd successfully");
  };

  return (
    <AnimatedPage>
      <div className="form_img_container">
        <div className="img_box">
          <img
            src={ResetImage}
            alt="illustration-failed"
            className="img_box1"
          />
        </div>

        <div className="form_box">
          <div className="form_box1">
            <div className="form_main">
                <button onClick={() => navigate(-1)} className="back_button_div ">
                  <IoChevronBackSharp />
                  <i className="fa fa-angle-left"></i> Back
                </button>
              <h1>Create Your New Password</h1>

              <form onSubmit={handleResetPassword}>
                <label className="resetLabel" htmlFor="new_password">
                  New Password
                </label>
                <div className="input_box_wrapper">
                  <input
                    className="input_box"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <label className="resetLabel" htmlFor="re_enter_newpassword">
                  ReEnter New Password
                </label>
                <div className="input_box_wrapper">
                  <input
                    className="input_box"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <button className="btn_confirm" type="submit">
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ResetPassword;
