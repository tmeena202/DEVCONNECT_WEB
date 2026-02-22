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

  const inputClass =
    "w-full bg-[#080808] border border-[#262626] rounded-sm px-3 py-2.5 font-mono text-[0.78rem] text-neutral-200 placeholder-neutral-600 outline-none focus:border-sky-400 focus:bg-[#0d0d0d] caret-sky-400 transition-colors duration-150";

  return (
    <div
      className="min-h-screen flex bg-[#0a0a0a] text-neutral-200"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      {/* ── Left Panel ── */}
      <div className="hidden md:flex w-1/2 flex-col justify-between p-14 bg-[#111111] border-r border-[#1f1f1f] relative overflow-hidden">
        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#1f1f1f 1px, transparent 1px), linear-gradient(90deg, #1f1f1f 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div className="relative z-10">

          <h1 className="font-mono text-xl font-semibold tracking-widest text-neutral-100">
            DEV<span className="text-sky-400">.</span>CONNECT
          </h1>

          <p className="mt-5 text-[0.78rem] text-neutral-500 leading-relaxed max-w-sm font-light">
            A focused networking platform built exclusively for developers.
            Discover like-minded engineers, explore opportunities, and build
            meaningful professional connections without distractions.
          </p>

          <div className="mt-10 flex flex-col gap-7">
            {[
              {
                title: "Curated Developer Feed",
                desc: "Swipe through developer profiles and connect with engineers who match your interests and skills.",
              },
              {
                title: "Distraction-Free Experience",
                desc: "No ads. No noise. Just meaningful tech connections.",
              },
              {
                title: "Built for Speed",
                desc: "Optimized with modern technologies for seamless performance and smooth interactions.",
              },
            ].map((f) => (
              <div key={f.title} className="border-l-2 border-[#2e2e2e] pl-4">
                <p className="font-mono text-[0.67rem] tracking-[0.12em] uppercase text-sky-400 font-medium">
                  {f.title}
                </p>
                <p className="mt-1 text-[0.75rem] text-neutral-500 leading-relaxed font-light">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 font-mono text-[0.62rem] text-neutral-700 tracking-wider">
          v2.0.1 · © 2025 dev.connect
        </p>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px] bg-[#111111] border border-[#1f1f1f] rounded-sm p-10">
          {/* Header */}
          <p className="font-mono text-[0.64rem] tracking-[0.18em] uppercase text-sky-400 mb-1">
            {isLoginForm ? "// auth" : "// register"}
          </p>
          <h2 className="text-[1.4rem] font-medium tracking-tight text-neutral-100">
            {isLoginForm ? "Welcome back" : "Create account"}
          </h2>
          <p className="mt-1 text-[0.75rem] text-neutral-500 font-light">
            {isLoginForm
              ? "Enter your credentials to continue"
              : "Fill the details to get started"}
          </p>

          {/* Fields */}
          <div className="mt-7 flex flex-col gap-3">
            {!isLoginForm && (
              <div className="flex gap-3">
                <input
                  type="text"
                  value={firstName}
                  placeholder="first_name"
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClass}
                />
                <input
                  type="text"
                  value={lastName}
                  placeholder="last_name"
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputClass}
                />
              </div>
            )}

            <input
              type="text"
              value={emailId}
              placeholder="email_address"
              onChange={(e) => setEmailId(e.target.value)}
              className={inputClass}
            />

            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 px-3 py-2 bg-[#1a0808] border border-[#2e1010] border-l-[3px] border-l-red-500 rounded-sm font-mono text-[0.71rem] text-red-400">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={isLoginForm ? handleLogin : handleSignUp}
            className="w-full mt-6 bg-sky-400 hover:bg-sky-300 active:scale-[0.99] transition-all duration-150 text-black font-mono font-semibold text-[0.72rem] tracking-[0.1em] uppercase py-2.5 rounded-sm cursor-pointer"
          >
            {isLoginForm ? "Sign In" : "Create Account"}
          </button>

          {/* Toggle */}
          <p
            className="mt-5 text-center font-mono text-[0.71rem] text-neutral-600 hover:text-sky-400 cursor-pointer transition-colors duration-150 select-none"
            onClick={() => setIsLoginForm((v) => !v)}
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