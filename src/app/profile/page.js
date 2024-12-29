'use client'

import axios from 'axios';
import React, { useState } from 'react';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
    const logout = async()=>{
       try {
         const response = await axios.get('/api/users/logout')
         console.log(response)
         window.location.reload()
       } catch (error) {
        
       }
    }


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'}`}>
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold text-white">Dashboard</div>
          <button
           className="bg-green-600 text-gray-300 hover:text-white p-2 rounded-md"
           onClick={logout}
          >
            Logout
          </button>
          <button
            onClick={toggleDarkMode}
            className="text-gray-300 hover:text-white p-2 rounded-md">
            Toggle Dark Mode
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <section className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-white mb-2">Card 1</h2>
            <p className="text-gray-400">This is a description of Card 1.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-white mb-2">Card 2</h2>
            <p className="text-gray-400">This is a description of Card 2.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-white mb-2">Card 3</h2>
            <p className="text-gray-400">This is a description of Card 3.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 p-4 text-center text-gray-400 absolute bottom-0 w-full ">
        <p>&copy; 2024 My Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
