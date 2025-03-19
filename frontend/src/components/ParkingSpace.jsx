import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Parking } from './Parking';

export const ParkingSpace = () => {
  return (
    <Routes>
      <Route path="/chitkara" element={<Parking name="Chitkara University" cost={100} slotsAvailable={true} contactNumber="123-456-7890" emergencyNumber="999-888-7777" />} />
      <Route path="/pinjoregarden" element={<Parking name="Pinjore Garden" cost={130} slotsAvailable={true} contactNumber="123-456-7890" emergencyNumber="999-888-7777" />} />
      <Route path="/elantemall" element={<Parking name="Elante Mall" cost={200} slotsAvailable={true} contactNumber="123-456-7890" emergencyNumber="999-888-7777" />} />
      <Route path="/rockgarden" element={<Parking name="Rock Garden" cost={80} slotsAvailable={true} contactNumber="123-456-7890" emergencyNumber="999-888-7777" />} />
    </Routes>
  );
};
