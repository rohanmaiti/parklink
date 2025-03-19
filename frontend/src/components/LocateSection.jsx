import React from 'react';
import { MapPin, Phone } from 'lucide-react';

export const LocateSection = () => {
  const places = [
    { name: 'Chitkara University Parking Spot', address: 'Chitkara University, Rajpura', phone: '+91 1762500000' },
    { name: 'Pinjore Garden ', address: 'Pinjore Garden, Pinjore', phone: '+91 9876543210' },
    { name: 'Rock Garden ', address: 'Rock Garden, Chandigarh', phone: '+91 8765432109' },
    { name: 'Elante Mall Health Center', address: 'Elante Mall, Chandigarh', phone: '+91 7654321098' },
    { name: 'Chandigarh Airport', address: 'Airport, Chandigarh', phone: '+91 7654321497' },
    { name: 'Chandigarh Railway Station', address: 'Sector 22, Chandigarh', phone: '+91 7656461078' },
  ];

  const displayedPlaces = window.innerWidth < 640 ? places.slice(0, 3) : places;

  return (
    <section id="locate" className="min-h-screen flex flex-col items-center justify-center bg-yellow-100 p-8">
      <h1 className="text-5xl font-bold text-gray-800 mb-8">Locate Parking Slots Near You</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedPlaces.map((hospital, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">{hospital.name}</h2>
            <div className="flex items-center mb-2">
              <MapPin className="text-blue-500" />
              <span className="ml-2 text-gray-600">{hospital.address}</span>
            </div>
            <div className="flex items-center">
              <Phone className="text-green-500" />
              <span className="ml-2 text-gray-600">{hospital.phone}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};