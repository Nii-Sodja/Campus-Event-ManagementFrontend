import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"

const LoginPage = () => {
    const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/api/users/login', {
            email,
            password
        });

        console.log('Login response:', response.data);

        if (!response.data.token) {
            setError('No token received from server');
            return;
        }

        // Store user data
        localStorage.setItem('User', JSON.stringify(response.data));

        // Verify stored data
        const storedUser = JSON.parse(localStorage.getItem('User'));
        console.log('Stored user data:', {
            hasToken: !!storedUser?.token,
            tokenLength: storedUser?.token?.length,
            userId: storedUser?._id,
            fullUser: storedUser
        });

        // Navigate to home page on successful login
        navigate('/');
        
    } catch (error) {
        console.error('Login error:', error.response?.data || error);
        setError(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && (
          <div className="mb-4 text-red-500 text-center text-sm">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-4 text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;