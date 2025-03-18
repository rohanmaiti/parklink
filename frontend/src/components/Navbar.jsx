import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Button from '@mui/material/Button';

export const Navbar = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  function handleLoginClick() {
    navigate("/login");
  }
  function handleBookClick(){
    if(!authUser)
      navigate("/login");
    else{
      navigate("/bookslots");
    }
  }

  return (
    <header className="p-4 bg-blue-950 text-gray-100 fixed top-0 w-full shadow-md z-50">
      <div className="container flex justify-between items-center mx-auto">
        <div className="flex items-center space-x-3" >
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-[40px] mr-4">
            <img src="/logo.png" alt="Logo" className="rounded-full" />
          </div>
        </div>
        <div className="mx-6" >
        <Button variant="outlined" onClick={handleBookClick} >Book Slot</Button>
        </div>

        {/* Navigation Links - Desktop */}
            <nav className="hidden lg:flex space-x-6">
              <a href="#home" className="hover:text-violet-400">Home</a>
              <a href="#service" className="hover:text-violet-400">Services</a>
              <a href="#locate" className="hover:text-violet-400">Locate</a>
              <a href="#detail" className="hover:text-violet-400">Detail</a>
              <a href="#about" className="hover:text-violet-400">About us</a>
            </nav>
        </div>
       

        {/* Login/Profile Section */}
        <div className="hidden lg:flex relative">
          {authUser ? (
            <div className="relative">
              {/* Profile Circle */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hover:scale-105 transition"
              >
                <img
                  src={authUser.profilePic || "/default-profile.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                
                <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md overflow-hidden">
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="px-5 py-2 font-semibold rounded bg-violet-600 hover:bg-violet-700 text-white"
            >
              Log in
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="p-2 lg:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="lg:hidden absolute top-16 left-0 w-full bg-blue-900 text-white shadow-md p-4 space-y-4">
          <a href="#home" className="block hover:text-violet-400">Home</a>
          <a href="#service" className="block hover:text-violet-400">Services</a>
          <a href="#locate" className="block hover:text-violet-400">Locate</a>
          <a href="#detail" className="block hover:text-violet-400">Detail</a>
          <a href="#about" className="block hover:text-violet-400">About us</a>
          {authUser ? (
            <div className="mt-4 border-t pt-2">
              <button
                onClick={() => navigate("/profile")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-800"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="w-full mt-4 px-5 py-2 font-semibold rounded bg-violet-600 hover:bg-violet-700"
            >
              Log in
            </button>
          )}
        </nav>
      )}
    </header>
  );
};
