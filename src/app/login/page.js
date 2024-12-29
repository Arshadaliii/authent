'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);

  const onSignIn = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      if (response.data.success === true) {
        router.push('/');
      }
    } catch (error) {
    } finally {
      setLoading(false); // Ensure loading is reset after the request
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-8 rounded-lg shadow-lg bg-gray-800 w-96 relative">
        <h2 className="text-3xl font-bold text-center mb-8 animate-pulse text-blue-400">
          {loading ? 'Loading...' : 'Sign In'}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="space-y-6"
        >
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
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
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
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            onClick={onSignIn}
            disabled={buttonDisable || loading} // Disable button during loading
            className={`w-full py-2 ${
              buttonDisable || loading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } transition-transform duration-300 rounded-lg text-gray-100 font-semibold focus:outline-none`}
          >
            {loading ? 'Please Wait...' : buttonDisable ? 'Fill the Form' : 'Sign In'}
          </button>
        </form>
        <div className="absolute -top-4 -left-4 w-10 h-10 border-4 border-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-10 h-10 border-4 border-pink-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Page;
