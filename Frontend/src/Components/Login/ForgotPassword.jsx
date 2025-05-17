import React, { useState, useRef } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import AnimatedPage from '../Login/AnimatedPage';
import { IoChevronBackSharp } from "react-icons/io5";
import {useSubmitForgotPasswordMutation} from '../../Redux/api/userApi'
import { toast } from "react-toastify";
import ForgotImage from "../../assets/Loginimg/illustration-forget.svg";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [otpSent, setOtpSent] = useState(false);
    const [verifyotp, setverifyotp] = useState(["", "", "", ""]);
    const navigate = useNavigate();
      const [isModalOpen, setIsModalOpen] = useState(false);
    
    const inputRefs = useRef([]);
   const [submitForgotPassword]=useSubmitForgotPasswordMutation();

    const handleSendOTP =async (e) => {
        e.preventDefault();
        //  console.log("email",email);
        const toaster= toast.loading("otp request sent");
        try{
         const response= await submitForgotPassword({email});
        //  console.log("response",response);
         setverifyotp(response.data.otp);
            setOtpSent(true);
            setIsModalOpen(true);
        }catch(error){
            console.error("Error submitting forgotpassword:", error);
        }
        finally{
            toast.dismiss(toaster);
        }

    };
    const handleOTPChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        let newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleVerify = () => {
            // console.log("Email before saving:", email);
            // console.log("verifyotp",verifyotp);
            // console.log("digit",otp);
            const enterotp = otp.join("");
        if (otp.join("").length === 4 && enterotp ===String(verifyotp)) {
            localStorage.setItem("resetEmail", email);
            // console.log("Stored Email:", localStorage.getItem("resetEmail"));
            toast.success("otp-verified successfully")
            navigate("/reset-password");

        } else {
            toast.error("Please enter a valid 4-digit OTP");
        }
    };

    return (
        <AnimatedPage>
        <div className=" lg:flex lg:flex-row sm:flex-col container1 ">
            <div className="left-box scale-75">
                <img src={ForgotImage} alt="Forgot Password" />
            </div>
            <div className="right-box">
                <div className="forgot-password-box">
                    <button className="back-button" onClick={handleBack}>
                        <IoChevronBackSharp/>
                        <i className="fa fa-angle-left"></i> Back
                    </button>
                    <h2>Forgot Password</h2>
                    <p>Enter your registered email, and we'll send you a code to reset your password.</p>
                    <form onSubmit={handleSendOTP}>
                        <input
                        
                            type="email"
                            placeholder="yourname@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button className="button12" type="submit">Send OTP</button>
                    </form>
                </div>
     
            </div>
          </div>

                {/* OTP Section */}
                {
                  isModalOpen  && (
                   <div className="modal-overlay ">
                     <div className="modal-content bg-white">
                    <div className={`otp-box ${otpSent ? "show" : "hide"}`}>
                        <h2>Enter OTP</h2>
                        <p>We have share a code of your registered email address<b>{email}</b></p>
                        <div className="otp-inputs">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOTPChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    style={{ width: "40px", height: "40px", textAlign: "center", margin: "5px" }}
                                />
                            ))}
                        </div>
                        <button className="button12" onClick={handleVerify}>Verify</button>
                    </div>
                    </div>
                   </div>
                  )
                }
            
          
       
        </AnimatedPage>
    );
};

export default ForgotPassword;
