"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { userschema } from "@/validationSchemas";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [isError, setIsError] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);
      console.log("Sign up success", response);
      if (response.data.success === true) {
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onError = () => {
    try {
      userschema.parse(user); // Validate inputs here
      setError({}); // Clear errors if validation passes
      setIsError(false); // Reset error state
    } catch (err) {
      if (err.errors) {
        const errors = {};
        err.errors.forEach((e) => {
          errors[e.path[0]] = e.message; // Create error object
        });
        setError(errors); // Update error messages

        setIsError(true); // Set error state to true
        // 5-second delay for showing the error
      }
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-900 text-white">
      <div className="p-8 rounded-lg shadow-lg bg-gray-800 w-96 relative">
        <h2 className="text-3xl font-bold text-center mb-8 animate-pulse text-blue-400">
          {loading ? "Loading..." : "Sign Up"}
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2 text-pink-400"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => {
                onError();
                return setUser({ ...user, username: e.target.value });
              }}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {user.username.length > 0 && (
              <p className="text-xs text-red-500 mt-1">{error.username}</p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2 text-pink-400"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => {
                onError();
                return setUser({ ...user, email: e.target.value });
              }}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {user.email.length > 0 && (
              <p className="text-xs text-red-500 mt-1">{error.email}</p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2 text-pink-400"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => {
                onError();
                return setUser({ ...user, password: e.target.value });
              }}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {user.password.length > 0 && (
              <p className="text-xs text-red-500 mt-1">{error.password}</p>
            )}
          </div>
          <button
            disabled={buttonDisable || loading || isError}
            onClick={onSignUp}
            className={`w-full py-2 ${
              buttonDisable || loading || isError
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } transition-transform duration-300 rounded-lg text-gray-100 font-semibold focus:outline-none`}
          >
            {loading
              ? "Please Wait..."
              : buttonDisable
              ? "Fill the Form"
              : isError
              ? "fill the form carefully"
              : "Sign Up"}
          </button>
        </form>
        <div className="absolute -top-4 -left-4 w-10 h-10 border-4 border-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-10 h-10 border-4 border-pink-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Page;



