import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dr-appointment-backend-xu4j.onrender.com/api/user/login",
        { email, password }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/home");
        localStorage.setItem("userId", response.data.user._id);
        console.log(
          "User ID stored in localStorage:",
          localStorage.getItem("userId")
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Something went wrong");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="register-login d-flex align-items-center justify-content-center ">
      <div className="border p-5 register-login-main">
        <h1 className="mb-5">Login</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group ">
              <input
                type="email"
                className="form-control m-3 "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control m-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <span className="m-3">
              Not have an account?? <Link to="/">Register</Link>
            </span>
            <br />
            <button type="submit" className="btn btn-primary mt-4 m-3">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
