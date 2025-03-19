import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const DetailSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const {authUser} = useAuthStore();
  return (
    <>
      {/* Details 1 - Locate Parking Slots */}
      <section id="details" className="basic-1 bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Locate Parking Slots Easily Near You</h2>
              <p className="text-gray-600 mb-6">
                Save your time by finding nearby parking slots using our platform. Navigate directly to the nearest available space without any hassle.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
              >
                Learn More
              </button>
            </div>
            <div className="md:w-1/2">
              <img className="w-full h-auto" src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png
" alt="Locate Parking" />
            </div>
          </div>
        </div>
      </section>

      {/* Modal - Additional Details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3">
              <img className="w-full h-auto" src="https://th.bing.com/th/id/OIP.xbXZYAJcHLHjxFgEmPhWiwAAAA?rs=1&pid=ImgDetMain" alt="Person working on laptop" />

              </div>
              <div className="md:w-1/3 p-6">
                <h3 className="text-xl font-semibold mb-4">Why Choose Our Platform?</h3>
                <p className="text-gray-600 mb-4">
                  Our platform offers real-time updates on available parking slots, ensuring you find the best spot quickly.  
                </p>
                <h4 className="font-semibold mb-2">Key Features</h4>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Real-time Parking Slot Updates</li>
                  <li>Navigation Support with Maps</li>
                  <li>24/7 Availability</li>
                  <li>Contactless Payment</li>
                  <li>User-Friendly Interface</li>
                </ul>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                onClick={()=>{
                    if(authUser){
                        navigate("/bookslots");
                    }
                    else{
                        navigate("/login");
                    }
                }}
                >Explore Now</button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="ml-4 bg-gray-300 px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details 2 - Easy Registration */}
      <section className="basic-2 py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img className="w-4/5 h-auto" src="https://www.westend61.de/images/0001615437pw/happy-man-with-wireless-headphones-using-smart-phone-XLGF02388.jpg"
            alt="Easy Registration" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Register and Start Using in Minutes</h2>
              <p className="text-gray-600 mb-6">
                Signing up is quick and easy. Create your account, find available parking spaces, and enjoy hassle-free parking with our app.
              </p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Simple Registration Process</li>
                <li>Quick Profile Setup</li>
                <li>Access Real-Time Slot Availability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
