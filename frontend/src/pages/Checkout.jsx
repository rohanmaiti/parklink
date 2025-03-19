import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, duration, cost } = location.state || {};

  const handlePayment = () => {
    toast.success('Thank you for using our parking slot!');
    navigate('/');
  };

  if (!name || duration === undefined || cost === undefined) {
    toast.error('Invalid checkout data');
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

      <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="mb-4"><span className="font-semibold">Parking Slot:</span> {name}</p>
        <p className="mb-4"><span className="font-semibold">Duration:</span> {duration} hours</p>
        <p className="mb-4"><span className="font-semibold">Total Cost:</span> ₹{cost}</p>

        <button
          className="w-full px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          onClick={handlePayment}
        >
          Pay
        </button>
      </div>
    </div>
  );
};
