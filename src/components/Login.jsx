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
        { emailId, password },
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
    <div className="min-h-screen flex bg-[#0f172a] text-gray-200">
      {/* Left Section */}
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-[#111827] p-16 flex-col justify-between border-r border-[#1f2937]">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            DEV<span className="text-sky-400">.</span>CONNECT
          </h1>

          <p className="text-gray-400 mt-6 max-w-md leading-relaxed text-sm">
            A focused networking platform built exclusively for developers.
            Discover like-minded engineers, explore opportunities, and build
            meaningful professional connections without distractions.
          </p>

          {/* Feature Points */}
          <div className="mt-10 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-sky-400">
                Curated Developer Feed
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                Swipe through developer profiles and connect with engineers who
                match your interests and skills.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-sky-400">
                Distraction-Free Experience
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                No ads. No noise. Just meaningful tech connections.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-sky-400">
                Built for Speed
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                Optimized with modern technologies for seamless performance and
                smooth interactions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-md bg-[#111827] border border-[#1f2937] rounded-xl p-10 shadow-xl">
          <h2 className="text-2xl font-semibold mb-2">
            {isLoginForm ? "Welcome back" : "Create account"}
          </h2>

          <p className="text-sm text-gray-400 mb-8">
            {isLoginForm
              ? "Enter your credentials to continue"
              : "Fill the details to get started"}
          </p>

          <div className="space-y-5">
            {!isLoginForm && (
              <div className="flex gap-4">
                <input
                  type="text"
                  value={firstName}
                  placeholder="First name"
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-1/2 bg-[#0f172a] border border-[#1f2937] rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-sky-500 transition"
                />

                <input
                  type="text"
                  value={lastName}
                  placeholder="Last name"
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-1/2 bg-[#0f172a] border border-[#1f2937] rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-sky-500 transition"
                />
              </div>
            )}

            <input
              type="text"
              value={emailId}
              placeholder="Email address"
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full bg-[#0f172a] border border-[#1f2937] rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-sky-500 transition"
            />

            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0f172a] border border-[#1f2937] rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-sky-500 transition"
            />
          </div>

          {error && (
            <div className="mt-4 text-sm text-red-400 bg-red-900/20 border border-red-500/30 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={isLoginForm ? handleLogin : handleSignUp}
            className="w-full mt-8 bg-sky-600 hover:bg-sky-500 transition text-white py-3 rounded-lg text-sm font-medium"
          >
            {isLoginForm ? "Sign In" : "Create Account"}
          </button>

          <p
            className="text-center text-sm text-gray-400 mt-6 cursor-pointer hover:text-sky-400 transition"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New here? Create an account"
              : "Already have an account? Sign in"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
