import React, { useEffect, useState } from "react";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import AnimatedPage from "../Login/AnimatedPage";
import {
  getLoggedInEmployee,
  useLoginMutation,
} from "../../Redux/api/userApi.js";
import { userExist } from "../../Redux/reducers/userReducer.js";
import LoginImage from "../../assets/Loginimg/login-svg.svg";
import LogoImage from "../../assets/Loginimg/Logo.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const {user} = useSelector((state) => state.userReducer);
  // console.log("user : ", user);
  
  const navigate = useNavigate();

  useEffect(() => {
    const lastPath = localStorage.getItem("lastPath") || "/"; // 🔥 लास्ट विजिटेड पेज लो
    if (user) {
        navigate(lastPath); // 🔄 उसी पेज पर रीडायरेक्ट करो
    }
}, [user, navigate]);

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let toastid = toast.loading("loading..")
    try {

      const res = await login({ email, password });
      // console.log(res)
      if ("data" in res) {
        const user = await getLoggedInEmployee();
        // console.log("user : ",user)
        dispatch(userExist(user));
        toast.success("Login successfull");

        const lastPath = localStorage.getItem("lastPath") || "/home";
        localStorage.removeItem("lastPath"); // इसे हटा दें ताकि अगली बार लॉगिन पर न जाए
        navigate(lastPath);
      }
      else{
        throw new Error(res?.error?.data.message || "Login Failed");
      }
    } catch (error) {
      console.log("login Failed", error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastid);
    }
  };

  return (
    <AnimatedPage>
      <div>
        <div className="login-container">
          <div className="img-box">
            <img
              src={LoginImage}
              alt="Login Illustration"
            />
          </div>
          <div className="form-box">
            <form onSubmit={handleSubmit} className="login-form">
              <h1 className="logo-title">
                <img
                  src={LogoImage}
                  alt="Company Logo"
                  className="logo"
                />
                HRMS
              </h1>
              <p>Welcome 👋</p>
              <h5>Please login here</h5>

              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input className="text-gray-950"
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input className="text-gray-950"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>

              <div className="actions">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="login-btn" disabled={isLoading}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Login;
