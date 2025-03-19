import React, { useState, useEffect } from 'react';

const images = [
  '/parkingimage1.jpg',
  '/parkingimage2.jpg',
  '/parkingimage3.avif',
];

export const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-xl">
      <img
        src={images[currentIndex]}
        alt="Parking Spot"
        className="w-full h-96 rounded-xl shadow-xl object-cover transition-opacity duration-700"
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full ${index === currentIndex ? 'bg-yellow-400' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};
