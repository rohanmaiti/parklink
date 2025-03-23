import React from 'react';
import { Navbar } from '../components/Navbar';
// import { ImageSlider } from '../components/Imageslider';
import { TypingEffect } from '../components/TypingEffect';
import { Services } from '../components/Services';
import { LocateSection } from '../components/LocateSection';
import { DetailSection } from '../components/DetailSection';
import { AboutSection } from '../components/AboutSection';
import { HomeSection } from '../components/HomeSection';

export const Landingpage = ({loginUser, setLoginuser}) => {
  return (
    <>
      <div className="h-screen overflow-y-auto scroll-smooth">
        <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
          <Navbar/>
        </div>

        {/* Home Section */}
        <section id="home" className="min-h-screen flex flex-col md:flex-row bg-blue-100">
          <HomeSection />
        </section>

        {/* Service Section */}
        <section id="service" className="min-h-screen flex items-center justify-center bg-green-100 p-4">
          {/* <h1 className="text-4xl text-center">Service Section</h1> */}
          <Services/>
        </section>

        {/* Locate Section */}
        <section id="locate" className="min-h-screen flex items-center justify-center bg-yellow-100 p-4">
          {/* <h1 className="text-4xl text-center">Locate Section</h1> */}
          <LocateSection/>
        </section>

        {/* Detail Section */}
        <section id="detail" className="min-h-screen flex items-center justify-center bg-red-100 p-4">
          {/* <h1 className="text-4xl text-center">Detail Section</h1> */}
          <DetailSection/>
        </section>

         {/* Detail Section */}
         <section id="about" className="min-h-screen flex items-center justify-center bg-red-100 p-2">
          {/* <h1 className="text-4xl text-center">About us Section</h1> */}
          <AboutSection/>
        </section>
      </div>
    </>
  );
};
