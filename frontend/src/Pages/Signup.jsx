import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

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
        <div className="bg-cover bg-center bg-fixed">
          <div className="h-screen flex justify-center items-center">
            <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
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
                  <a className="text-gray-600 hover:text-gray-800" href="#">
                    Forgot your password?
                  </a>
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
