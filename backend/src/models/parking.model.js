// models/ParkingLog.js
const mongoose = require("mongoose");

const parkingLogSchema = new mongoose.Schema({
  email: {
    type:String,
    require:true
  },
  entryTime: Date,
  exitTime: Date,
});

const ParkingLog = mongoose.model('ParkingLog', parkingLogSchema);
module.exports = ParkingLog;
