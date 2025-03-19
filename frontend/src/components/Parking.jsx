import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'qr-scanner';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

export const Parking = ({ name, cost, slotsAvailable, contactNumber, emergencyNumber }) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  let streamRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [parkingStarted, setParkingStarted] = useState({ status: false, name: null });
  const { checkParkingStatus, setParkingSlot, hasParkingSlot } = useAuthStore();
  const [activeParkingSlot, setActiveParkingSlot] = useState(undefined);

  useEffect(() => {
    const fetchParkingStatus = async () => {
      try {
        const status = await checkParkingStatus(name);
        setParkingStarted({ status: status.active, name: status.name });
        if (status.active) {
          setActiveParkingSlot(name);
        }
      } catch (error) {
        console.error('Error fetching parking status:', error);
      }
    };

    fetchParkingStatus();
    return () => stopCamera();
  }, []);

  const openCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'environment' // Use the rear camera
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setScanning(true);
        startScanning();
      }
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        alert('Camera access denied. Please allow camera permissions in your browser settings.');
      } else if (error.name === 'NotFoundError') {
        alert('No camera found. Please check your device camera.');
      } else {
        alert('Unable to access the camera: ' + error.message);
      }
    }
  };
  

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setScanning(false);
  };

  const startScanning = () => {
    const qrScanner = new QrScanner(
      videoRef.current,
      async result => {
        console.log('QR Code detected:', result);
        stopCamera();
        try {
          if (!hasParkingSlot) {
            await axiosInstance.post('/parking/entry', { qrData: result.data, name });
            setParkingStarted({ status: true, name });
            new Audio('/beep-sound.mp3').play();
            toast.success('Parking started successfully!');
            setParkingSlot(name);
            setActiveParkingSlot(name);
          } else {
            const res = await axiosInstance.post('/parking/exit', { qrData: result.data, name });
            setParkingStarted({ status: false, name: null });
            setActiveParkingSlot(undefined);
            setParkingSlot(undefined);
            const duration = res.data.duration;
            const totalCost = duration * cost;
            toast.success(`Parking ended. Duration: ${res.data.duration} hours`);
            navigate('/checkout', { state: { name, duration: res.data.duration, cost: totalCost } });
          }
        } catch (error) {
          console.error('Error managing parking:', error);
          toast.error('Failed to manage parking.');
        }
      },
      { returnDetailedScanResult: true }
    );
    qrScanner.start();
  };
  

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <button className="mb-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600" onClick={() => { stopCamera(); navigate(-1); }}>
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-center mb-6">{name}</h1>

      <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <div 
          className="mb-6 border rounded-lg h-48 flex items-center justify-center text-gray-400 cursor-pointer overflow-hidden" 
          onClick={openCamera}
        >
          <video ref={videoRef} className="w-full h-full object-cover" playsInline muted autoPlay />
        </div>

        {(activeParkingSlot === name || (parkingStarted.status && name === parkingStarted.name)) && <div className="text-center text-green-400 font-bold mb-4">Parking Started Successfully! Timer Active.</div>}
        
        <button className="w-full mb-6 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600" onClick={openCamera}>
          {hasParkingSlot === name ? 'Get Out' : 'Get In'}
        </button>
        
        <div className={`w-full text-center py-3 mb-4 rounded-lg ${slotsAvailable ? 'bg-green-500' : 'bg-red-500'}`}>
          {slotsAvailable ? 'SLOT AVAILABLE' : 'SLOT FULL'}
        </div>

        <p className="mb-2"><span className="font-semibold">Contact Number:</span> {contactNumber}</p>
        <p className="mb-2"><span className="font-semibold">Rate Per Hour:</span> {cost} Rs</p>
        <p className="mb-2 text-red-400"><span className="font-semibold">Emergency Number:</span> {emergencyNumber}</p>
      </div>
    </div>
  );
};
