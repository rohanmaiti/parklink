import React, { useState } from 'react';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(email);
      
      const response = await axiosInstance.post('/auth/forgot-password', { email:email });
      console.log(response);
      toast.success(response.data.message || 'Reset link sent to your email.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-white mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            className={`w-full p-2 rounded ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <button
        className="absolute bottom-4 left-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>
      </div>
    </div>
  );
};
