import React from 'react';
import { TypingEffect } from './TypingEffect';
import { ImageSlider } from './ImageSlider';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const HomeSection = () => {
  const {authUser} = useAuthStore();  
  const navigate = useNavigate();
  return (
    <section id="home" className="w-full min-h-screen flex flex-col md:flex-row items-center bg-gradient-to-r from-blue-100 to-blue-400">
     
      {/* Image Section with Slider */}
      <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
        <ImageSlider />
      </div>

       {/* Text Section with Animation */}
       <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <h1 className="text-6xl font-bold text-white mb-4">Welcome to <span className="text-yellow-400">ParkLink</span></h1>
        <TypingEffect text="Book your slot now and experience smart parking!" />
        <button className="mt-8 px-8 py-4 bg-yellow-400 text-gray-900 rounded-full text-lg font-semibold shadow-lg hover:bg-yellow-500 transition-all duration-300"
        onClick={()=>{
            if(authUser){
                navigate("/bookslots");
            }
            else{
                navigate("/login");
            }
        }}
        >
          Get Started
        </button>
      </div>

    </section>
  );
};
