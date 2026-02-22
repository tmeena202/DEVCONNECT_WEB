import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const NAV_LINKS = [
  { to: "/", label: "Feed" },
  { to: "/profile", label: "Profile" },
  { to: "/connections", label: "Connections" },
  { to: "/requests", label: "Requests" },
];

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#111111] border-b border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Brand */}
        <Link
          to="/"
          className="font-mono text-[0.85rem] font-semibold tracking-[0.18em] uppercase text-neutral-100 hover:text-white transition-colors duration-150"
        >
          DEV<span className="text-sky-400">.</span>CONNECT
        </Link>

        {/* Right side */}
        {user && (
          <div className="flex items-center gap-5 relative" ref={dropdownRef}>

            {/* Welcome text */}
            <p className="hidden md:block font-mono text-[0.68rem] tracking-wide text-neutral-600">
              <span className="text-neutral-500">~/</span>
              <span className="text-neutral-300 ml-1">{user.firstName}</span>
            </p>

            {/* Avatar button */}
            <button
              onClick={() => setOpen(!open)}
              className="relative h-8 w-8 rounded-sm overflow-hidden border border-[#2e2e2e] hover:border-sky-400 transition-colors duration-150 cursor-pointer"
            >
              <img
                src={user.photoUrl}
                alt="User Avatar"
                className="h-full w-full object-cover"
              />
              {/* Online indicator */}
              <span className="absolute bottom-0 right-0 h-2 w-2 bg-sky-400 rounded-none border border-[#111111]" />
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 top-12 w-52 bg-[#111111] border border-[#262626] rounded-sm shadow-2xl shadow-black/60 py-1 z-50">

                {/* Section label */}
                <p className="px-4 pt-2 pb-1 font-mono text-[0.6rem] tracking-[0.18em] uppercase text-neutral-700">
                  Navigate
                </p>

                {NAV_LINKS.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 font-mono text-[0.73rem] text-neutral-400 hover:text-neutral-100 hover:bg-[#1a1a1a] transition-colors duration-100"
                  >
                    <span className="text-sky-600 select-none">›</span>
                    {label}
                  </Link>
                ))}

                <div className="border-t border-[#1f1f1f] my-1.5 mx-3" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 font-mono text-[0.73rem] text-red-500 hover:text-red-400 hover:bg-[#1a0808] transition-colors duration-100 cursor-pointer"
                >
                  <span className="select-none">×</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;