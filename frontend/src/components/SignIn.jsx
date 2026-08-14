import React, { useState } from "react";
import { Link } from "react-router";
import "../styles/auth.css";
import useSignin from "../hooks/useSignin.js";

function SignIn() {
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

  const { loading, signin } = useSignin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidData()) return;
    signin(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="signup-page">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <h1 className="text-2xl font-extrabold text-black">JOBTRACK</h1>
        <h1>Login Your Account</h1>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            className="inp"
            name="email"
            placeholder="example@gmail.com"
            type="email"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <div className="pass-div">
            <input
              className="inp"
              name="password"
              placeholder="password"
              type={showPassword ? "text" : "password"}
              autoComplete="none"
              onChange={(e) => handleChange(e)}
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
          Don't have an account?{" "}
          <Link className="navigate" to="/signup">
            Sign Up
          </Link>
        </p>
        <button className="auth-button" type="submit">
          {loading ? "Loading..." : "SignIn"}
        </button>
      </form>
    </div>
  );
}

export default SignIn;
