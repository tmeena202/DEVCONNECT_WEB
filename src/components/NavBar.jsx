import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser);
      return navigate("/login");
    } catch (err) {}
  };

  return (
    <div className="navbar bg-base-300 px-6 shadow-md">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold tracking-wide text-primary">
          DEVCONNECT
        </Link>
      </div>

      {/* Right Side */}
      {user && (
        <div className="flex items-center gap-4">
          {/* Welcome Text */}
          <p className="hidden sm:block font-medium text-gray-200">
            Welcome,{" "}
            <span className="font-semibold text-white">{user.firstName}</span>
          </p>

          {/* Dropdown */}
          <div className="dropdown dropdown-end">
            {/* Avatar Button */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-11 rounded-full ring-2 ring-green-400/50 transition duration-300  hover:ring-green-400 hover:shadow-lg hover:shadow-green-500/40">
                <img
                  src={user.photoUrl}
                  alt="User Avatar"
                  className="rounded-full object-cover"
                />
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 w-52 rounded-xl bg-base-200 p-3 shadow-xl"
            >
              <li>
                <Link
                  to="/profile"
                  className="rounded-lg hover:bg-primary hover:text-white"
                >
                  👤 Profile
                </Link>
              </li>

              <li>
                <a className="rounded-lg hover:bg-primary hover:text-white">
                  ⚙️ Settings
                </a>
              </li>

              <li>
                <a
                  onClick={handleLogout}
                  className="rounded-lg text-red-400 hover:bg-red-500 hover:text-white"
                >
                  🚪 Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
