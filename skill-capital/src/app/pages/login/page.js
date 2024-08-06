"use client";
import React, { useState } from 'react';
export default function Login() {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const validateForm = () => {
    let valid = true;
    setUsernameError('');
    setPasswordError('');
    if (!name) {
      setUsernameError('Enter Username');
      valid = false;
    }
    if (!password) {
      setPasswordError('Enter Password');
      valid = false;
    }
    return valid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        console.log('Login successful:', data);
        
      } else {
        setPasswordError(data.message || 'Login failed.');
      }
    } catch (error) {
      setLoading(false);
      setPasswordError('error.');
    }
  };
  return (
    <main>
      <div className="w-full lg:flex lg:h-screen">
        <div className="p-10 pb-8 lg:w-1/2 flex flex-col justify-center bg-white lg:pl-20">
          <div className="pl-5">
            <img src="/skillcapital.png" alt="Skill Capital" />
          </div>
          <form className="container-sm relative top-9 border rounded max-w-xl shadow-lg p-9" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-900 text-sm mb-2" htmlFor="email">Username</label>
              <input
                className="shadow-sm appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="name"
                placeholder="Enter username"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-900 text-sm mb-2" htmlFor="password">Password</label>
              <input
                className="shadow-sm appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            <div className="pt-9">
              <button
                type="submit"
                className="w-full justify-center rounded-lg bg-gradient-to-r from-orange-300 to-pink-500 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
            <div className="mt-10">
              <input type="checkbox" className="h-4 w-5" id="remember-me" />
              <label htmlFor="remember-me" className="pl-1">Remember me</label>
              <p className="text-gray-600 text-center pt-10">
                ©2024, All rights reserved
              </p>
            </div>
          </form>
        </div>
        <div className="hidden lg:flex lg:w-2/4 flex-col items-center justify-center bg-white pt-20">
          <h2 className="text-2xl font-bold text-center mb-4 text-[#042D60] text-[2rem]">Seamlessly manage all learner data in a unified platform.</h2>
          <p className="text-center text-gray-700 mb-6">Centralize customer data effortlessly. Streamline communication, sales, and support for seamless growth.</p>
          <img src="/skill.png" alt="Skill Capital Login Page" />
        </div>
      </div>
    </main>
  );
}
