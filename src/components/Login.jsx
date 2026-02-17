import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-gray-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
          {isLoginForm ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        {/* Form */}
        <div className="space-y-4">
          {/* Signup Extra Fields */}
          {!isLoginForm && (
            <div className="flex gap-3">
              <input
                type="text"
                value={firstName}
                placeholder="First Name"
                className="w-1/2 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                type="text"
                value={lastName}
                placeholder="Last Name"
                className="w-1/2 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          )}

          {/* Email */}
          <input
            type="text"
            value={emailId}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setEmailId(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mt-3 text-center font-medium">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          className="w-full mt-6 py-3 rounded-xl font-semibold text-lg text-white bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
          onClick={isLoginForm ? handleLogin : handleSignUp}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>

        {/* Toggle */}
        <p
          className="text-center text-gray-300 mt-6 cursor-pointer hover:text-white transition"
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm
            ? "New User? Signup Here →"
            : "Already have an account? Login Here →"}
        </p>
      </div>
    </div>
  );
};
export default Login;
