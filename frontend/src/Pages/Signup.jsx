import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { signup, isLoading, error } = useSignup();
  const handelSignup = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <>
      <div>
        <div className="bg-cover bg-center bg-fixed bg-[#F7E2DF]">
          <div className="h-screen flex justify-center items-center">
            <div className="bg-white mx-4 p-8 rounded-xl shadow-lg w-full md:w-1/2 lg:w-1/3">
              <h1 className="text-3xl font-bold mb-8 text-center">Signup</h1>
              <form onSubmit={handelSignup}>
                <div className="mb-4">
                  <label
                    className="block font-semibold text-gray-700 mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    required="required"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block font-semibold text-gray-700 mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    required="required"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <button
                    disabled={isLoading}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Signup
                  </button>
                  {error && (
                    <div
                      className="text-red-500 text-lg border border-red-400 p-3 rounded-lg mt-3 bg-red-50
                    "
                      role="alert"
                    >
                      {error}
                      <p
                        className="text-black mt-2
                      "
                      >
                        Try Login instead
                        <Link
                          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ml-2"
                          to="/login"
                        >
                          Login
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
