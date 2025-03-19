import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const AboutSection = () => {
  return (
    <div id="about" className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-4xl w-full">
        {/* Image Section */}
        <div className="w-full h-64 rounded-full overflow-hidden mb-8 md:mb-0 md:mr-12 animate-fadeIn">
          <img
            src="dp.jpeg"
            alt="User"
            className="w-64 h-64 rounded-full object-cover aspect-square"
          />
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left animate-slideIn">
          <h1 className="text-4xl font-bold mb-4">Hi, I'm Rohan Maiti</h1>
          <p className="text-lg mb-4">A passionate 3rd-year student at <span className="text-yellow-400">Chitkara University</span>, specializing in software development.</p>
          <p className="text-lg mb-4">I built this project using the <span className="text-blue-400">MERN Stack</span>, integrating JWT for authentication and WebSocket for real-time communication.</p>

          {/* Highlighted Section */}
          <p className="text-lg mb-4 border-l-4 border-yellow-400 pl-4 italic">
            <span className="font-bold text-yellow-300">Note:</span> This is also an <span className="text-green-400">IoT-based project</span>, where data from the IoT devices is shared through a serial port. Since connecting to a computer at all times is not feasible, I have provided a video demonstration of the project. Please check it out! <br />
            <span className="font-semibold text-white">This is the website for accessing parking slots.</span>
          </p>

          {/* Project Link */}
          <a
            href="https://yourprojectlink.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 underline hover:text-yellow-300"
          >
            Checkout the full project here &raquo;
          </a>
        </div>
      </div>

      {/* Social Links */}
      <footer className="mt-16">
        <h3 className="text-xl mb-4">Connect with me:</h3>
        <div className="flex justify-center space-x-6">
          <a href="https://github.com/rohanmaiti" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-white text-3xl hover:text-gray-400 transition duration-300" />
          </a>
          <a href="https://www.linkedin.com/in/rohanmaiti/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-white text-3xl hover:text-blue-500 transition duration-300" />
          </a>
          <a href="https://www.instagram.com/_rohanmaiti" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white text-3xl hover:text-pink-500 transition duration-300" />
          </a>
        </div>
      </footer>
    </div>
  );
};
