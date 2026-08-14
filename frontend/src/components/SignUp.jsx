import React, { useState } from "react";
import "../styles/auth.css";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup.js";
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const isValidData = () => {
    if (!formData.email || !formData.password) {
      setError("email and password are required");
      return false;
    }
    return true;
  };
  const { loading, signup } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isValidData()) return;
    signup(formData);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="signup-page">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <h1 className="text-2xl font-extrabold text-black">JOBTRACK</h1>
        <h1>Create Your Account</h1>
        <div>
          <label htmlFor="userName">User Name:</label>
          <input
            onChange={(e) => handleChange(e)}
            name="userName"
            placeholder="User Name"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) => handleChange(e)}
            name="email"
            placeholder="example@gmail.com"
            type="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <div className="pass-div">
            <input
              onChange={(e) => handleChange(e)}
              name="password"
              placeholder="password"
              type={showPassword ? "text" : "password"}
              autoComplete="none"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <img src="https://cdn0.iconfinder.com/data/icons/e-commerce-297/3600/46-64.png" />
              ) : (
                <img src="https://cdn1.iconfinder.com/data/icons/user-interface-5-basic-outline/24/close_eye__eye_close_eye_password_hidden-64.png" />
              )}
            </span>
          </div>
        </div>
        <p>
          Already have an account?{" "}
          <Link className="navigate" to="/signin">
            signin
          </Link>
        </p>
        <button className="auth-button" type="submit">
          {loading ? "Loading..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
