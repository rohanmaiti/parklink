import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const parkingData = [
  { name: 'Chitkara University', cost: 100, path: 'chitkara' },
  { name: 'Elante Mall', cost: 130, path: 'elantemall' },
  { name: 'Rock Garden', cost: 120, path: 'rockgarden' },
  { name: 'Pinjore Garden', cost: 200, path: 'pinjoregarden' },
];

const BookSlot = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { hasParkingSlot, checkParkingStatus } = useAuthStore();

  // change done here for proper red dot management
  useEffect(()=>{
    parkingData.forEach(ele=>{
      checkParkingStatus(ele.name);
    })
  },[])

  const filteredData = parkingData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to ParkLink</h1>
      
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search Nearest Parking Area.."
          className="p-3 w-80 rounded-l-lg border border-gray-300 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-500 px-5 py-3 text-white rounded-r-lg hover:bg-blue-600">
          🔍
        </button>
      </div>

      <div className="space-y-6 max-w-lg mx-auto">
        {filteredData.length === 0 ? (
          <p className="text-gray-500 text-center">No parking areas found.</p>
        ) : (
          filteredData.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/parking/${item.path}`)}
              className="cursor-pointer flex justify-between items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 relative"
            >
              <span className="text-xl font-semibold">{item.name}</span>
              <span className="text-orange-500 font-medium">Cost per hour: {item.cost} Rs</span>
              {hasParkingSlot === item.name && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></div>
              )}
            </div>
          ))
        )}
      </div>

      <button
        className="fixed bottom-8 left-8 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        onClick={() => navigate('/')}
      >
        ← Back
      </button>
    </div>
  );
};

export default BookSlot;
