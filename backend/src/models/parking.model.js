// models/ParkingLog.js
import mongoose from 'mongoose';

const parkingLogSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  slotName: String, // Track which slot user parked in
  entryTime: Date,
  exitTime: Date,
});

const ParkingLog = mongoose.model('ParkingLog', parkingLogSchema);
export default ParkingLog;
