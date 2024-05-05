import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dr-appointment-backend-1.onrender.com/api/user/register",
        {
          name,
          email,
          password,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        // toast("redirecting to login page");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Something went wrong");
    }
    setname("");
    setEmail("");
    setpassword("");
  };

  return (
    <div className="register-login d-flex align-items-center justify-content-center ">
      <div className="border p-5 register-login-main">
        <h1 className="mb-5">Register</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group ">
              <input
                type="text"
                className="form-control m-3 "
                placeholder="Enter name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="form-group ">
              <input
                type="email"
                className="form-control m-3 "
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control m-3"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <span className="m-3">
              Already have an accout?? <Link to="/login">Login</Link>
            </span>
            <br />
            <button type="submit" className="btn btn-primary mt-4 m-3">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
