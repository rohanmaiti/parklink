import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };




  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "email is required";
    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      e.preventDefault();
      login(formData, navigate);
      // alert("Login Successful");
    } catch (error) {
      alert("Login Failed");
    }
    setLoading(false);
  };

  return (
    <div className="w-3/4 max-w-md p-8 space-y-3 rounded-xl bg-gray-900 text-gray-100 m-auto my-10">
      <h1 className="text-2xl text-white font-bold text-center">Login</h1>
      <form noValidate onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block text-gray-400">email</label>
          <input type="text" name="email" id="email" placeholder="email" 
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
          <div className="flex justify-end text-xs text-gray-400">
            <a href="#">Forgot Password?</a>
          </div>
        </div>
        <button type="submit" className="block w-full p-3 text-center rounded-sm text-gray-50 bg-violet-600 hover:cursor-pointer">
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
        <p className="px-3 text-sm text-gray-400">Login with social accounts</p>
        <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <button aria-label="Log in with Google" className="p-3 rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
        </button>
      </div>
      <p className="text-xs text-center sm:px-6 text-gray-400">Don't have an account?
        <a href="/signup" className="underline text-gray-300"> Sign up</a>
      </p>
    </div>
  );
};