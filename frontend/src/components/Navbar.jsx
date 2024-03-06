import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-600 p-8 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          {" "}
          <Link to={"/"}>Workout Buddy</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/signup" className="text-white hover:text-gray-300">
            Signup
          </Link>
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
