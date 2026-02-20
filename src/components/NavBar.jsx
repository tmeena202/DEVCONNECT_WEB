import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

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
    <header className="sticky top-0 z-40 w-full bg-[#111827] border-b border-[#1f2937]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-gray-200">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          DEV<span className="text-sky-400">.</span>CONNECT
        </Link>

        {user && (
          <div className="flex items-center gap-6 relative" ref={dropdownRef}>
            <p className="hidden md:block text-sm text-gray-400">
              Welcome,{" "}
              <span className="text-gray-100 font-medium">
                {user.firstName}
              </span>
            </p>

            <button
              onClick={() => setOpen(!open)}
              className="relative h-10 w-10 rounded-full overflow-hidden"
            >
              <img
                src={user.photoUrl}
                alt="User Avatar"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-sky-500 rounded-full border-2 border-[#111827]" />
            </button>

            {open && (
              <div className="absolute right-0 top-14 w-56 bg-[#1f2937] border border-[#2a3441] rounded-lg shadow-lg py-2 z-50">
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-[#111827] transition"
                >
                  Profile
                </Link>

                <Link
                  to="/connections"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-[#111827] transition"
                >
                  Connections
                </Link>

                <Link
                  to="/requests"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-[#111827] transition"
                >
                  Requests
                </Link>

                <div className="border-t border-[#2a3441] my-2" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition"
                >
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
