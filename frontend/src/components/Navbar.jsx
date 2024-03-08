import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../../public/logo.svg";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handelLogout = () => {
    logout();
  };
  return (
    <nav className="bg-gray-600 p-8 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          {" "}
          <div>
            <Link to={"/"}>
              <img src={logo} alt="logo" className="w-16 h-16" />
            </Link>
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          {user && (
            <div className="flex space-x-4 items-center justify-center ">
              <div className="text-white">{user && user.email}</div>

              <button
                className="text-white hover:text-gray-300 bg-red-500 px-4 py-2 rounded   "
                onClick={handelLogout}
              >
                Log out
              </button>
            </div>
          )}
          {!user && (
            <div className="flex space-x-4">
              <Link
                to="/signup"
                className="text-white hover:text-gray-300 bg-blue-500 px-4 py-2 rounded-lg "
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="text-white hover:text-gray-300 bg-red-500 px-4 py-2 rounded-lg"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
