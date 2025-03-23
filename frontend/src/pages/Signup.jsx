import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuthStore();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!validate()) return;
    try {
      // alert(JSON.stringify(formData));
      signup(formData, navigate);
    } catch (error) {
      console.log("Signup Failed");
    }
  };

  return (
    <div className="w-3/4 max-w-md p-8 space-y-3 rounded-xl bg-gray-900 text-gray-100 m-auto my-10">
      <h1 className="text-2xl text-white font-bold text-center">Sign Up</h1>
      <form noValidate onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block text-gray-400">Email Address</label>
          <input type="email" name="email" id="email" placeholder="Email" 
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
            value={formData.email} onChange={handleChange} />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block text-gray-400">Password</label>
          <input type="password" name="password" id="password" placeholder="Password" 
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
            value={formData.password} onChange={handleChange} />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>
        <button type="submit" className="block w-full p-3 text-center rounded-sm text-gray-50 bg-violet-600 hover:cursor-pointer">
          {isSigningUp ? "Signing up..." : "Sign up"}
        </button>
      </form>
      <p className="text-xs text-center sm:px-6 text-gray-400">Already have an account?
        <a href="/login" className="underline text-gray-300"> Log in</a>
      </p>
      <button
        className="absolute bottom-4 left-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>
    </div>
  );
};
