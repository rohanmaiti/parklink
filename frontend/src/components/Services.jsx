import React from 'react';

export const Services = () => {
  return (
    <div id="features" className="cards-1 py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            ParkLink is a parking service with 
            <span className="text-orange-500"> awesome features</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-6 rounded-lg bg-purple-100">
                <span className="fas fa-headphones-alt text-purple-500 text-4xl"></span>
              </div>
            </div>
            <h4 className="text-xl font-semibold mb-4">Eazy Access</h4>
            <p className="text-gray-600">Get quick and easy access to parking spaces with our seamless booking system. No more waiting in long queues.</p>
          </div>

          {/* Card 2 */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-6 rounded-lg bg-green-100">
                <span className="far fa-clipboard text-green-500 text-4xl"></span>
              </div>
            </div>
            <h4 className="text-xl font-semibold mb-4">Available Slots Tracking</h4>
            <p className="text-gray-600">Easily track available parking slots in real-time, reducing your search time and ensuring hassle-free parking.</p>
          </div>

          {/* Card 3 */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-6 rounded-lg bg-blue-100">
                <span className="far fa-comments text-blue-500 text-4xl"></span>
              </div>
            </div>
            <h4 className="text-xl font-semibold mb-4">Nearby Location</h4>
            <p className="text-gray-600">Find parking spaces near your current location using our advanced geolocation feature for added convenience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};


