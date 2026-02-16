import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true },
      );
      // console.log(res);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card bg-base-300 w-96 shadow-lg rounded-xl">
        <div className="card-body px-8 py-10 space-y-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-center">Welcome Back 👋</h2>

          {/* Email */}
          <label className="form-control w-full">
            <span className="label-text mb-2 font-medium">Email ID</span>
            <input
              type="email"
              value={emailId}
              placeholder="Enter your email"
              className="input input-bordered w-full"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>

          {/* Password */}
          <label className="form-control w-full">
            <span className="label-text mb-2 font-medium">Password</span>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              className="input input-bordered w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* Button */}
          <button className="btn btn-primary w-full mt-4" onClick={handleLogin}>
            Login
          </button>

          {/* Extra Text */}
          <p className="text-sm text-center opacity-70">
            Don’t have an account?{" "}
            <span className="link link-primary">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
