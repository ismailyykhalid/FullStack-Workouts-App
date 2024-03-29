import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../../public/logo.svg";

const Header = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handelLogout = () => {
    logout();
  };
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg ">
        <div className="px-4 ">
          <div className="flex items-center justify-between">
            <div className="flex shrink-0">
              <Link className="flex items-center" to="/">
                <img className="h-10 w-10" src={logo} alt="" />
              </Link>
            </div>

            <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
              {user && (
                <div className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
                  {user && user.email}
                </div>
              )}
            </div>
            <div className="flex items-center justify-end gap-3">
              {!user && (
                <div className="flex items-center justify-end gap-3">
                  <Link
                    className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                    to="/signup"
                  >
                    Sign up
                  </Link>
                  <Link
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    to="/login"
                  >
                    Login
                  </Link>
                </div>
              )}
              {user && (
                <Link
                  className="inline-flex items-center justify-center rounded-xl bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  to="/logout"
                  onClick={handelLogout}
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
