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
    <div className="relative w-full    mx-auto mt-20 flex justify-center items-center">
      <img src={images[currentIndex]} alt="Slide" className="h-fit rounded-lg shadow-lg transition-all duration-500" />
    </div>
  );
};
