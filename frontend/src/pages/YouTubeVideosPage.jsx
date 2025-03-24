import React from 'react';
import { useNavigate } from 'react-router-dom';

export const YouTubeVideosPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen">
      <button 
        className="self-start mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      
      <h1 className="text-4xl font-bold mb-6 text-blue-400">IoT-based Accident Avoidance Smart Parking Lot</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="w-full">
          <iframe className="w-full h-[315px] md:w-[560px]"  src="https://www.youtube.com/embed/dlbhTwNZ9ts?si=ASKUpiHcV-GRWlqi" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>

        <div className="w-full">
          <iframe className="w-full h-[315px] md:w-[560px]"  src="https://www.youtube.com/embed/Emq3FxHKcxo?si=2PWqRmPQx60bPNF-" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
      </div>

      <p className="text-lg text-left max-w-2xl mb-8 p-4 bg-yellow-400 text-black rounded-lg">
        Welcome to our detailed walkthrough of the IoT-based Accident Avoidance Smart Parking Lot project. This system uses advanced sensors and real-time data to enhance safety and efficiency in parking management. Watch the videos above to learn more about how it works and the components involved.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="text-center bg-white p-4 rounded-lg shadow-lg">
          <img src="entry_qr.jpg" alt="Entry QR Code" className="w-64 h-64 object-cover mx-auto" />
          <p className="mt-4 font-semibold text-gray-700">Entry QR Code</p>
        </div>

        <div className="text-center bg-white p-4 rounded-lg shadow-lg">
          <img src="exit_qr.jpg" alt="Exit QR Code" className="w-64 h-64 object-cover mx-auto" />
          <p className="mt-4 font-semibold text-gray-700">Exit QR Code</p>
        </div>
      </div>
    </div>
  );
};