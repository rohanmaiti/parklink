const ParkingLog = require("../models/parking.model");

const SECRET_STRING_ENTRY = "mySecret123";
const SECRET_STRING_EXIT = "mySecret123_Exit";

async function handleEntry(req, res) {
  console.log("handleEntry function");
  const { qrData , name } = req.body;
  const email = req.user.email;
  // Validate QR Code using secret
  if (qrData !== SECRET_STRING_ENTRY) {
    return res.status(400).json({ message: 'Invalid QR Code' });
  }
  // Check if user is already parked
  const existingLog = await ParkingLog.findOne({ email, exitTime: null });
  if (existingLog) {
    return res.status(400).json({ message: 'User already parked' });
  }
  // Log Entry
  const newLog = new ParkingLog({ email, entryTime: new Date(), slotName:name });
  await newLog.save();


  res.status(200).json({ message: 'Entry recorded successfully' });
}

async function handleExit(req, res) {

  const { qrData, name } = req.body;
  const email = req.user.email;
  // Validate QR Code using secret
  if (qrData !== SECRET_STRING_EXIT) {
    return res.status(400).json({ message: 'Invalid QR Code' });
  }

  const log = await ParkingLog.findOne({ email, exitTime: null });
  if (!log) {
    return res.status(404).json({ message: 'No active parking session' });
  }

  log.exitTime = new Date();
  await log.save();

  const duration = (log.exitTime - log.entryTime) / 1000 / 60 / 60; // in hours
  res.status(200).json({ message: 'Exit recorded', duration:duration });
}

async function checkParkingStatus(req, res) {
    const {name} = req.body;
    const email = req.user.email;
  const log = await ParkingLog.findOne({ email, exitTime: null, slotName:name});
  if (log) {
    const currentTime = new Date();
    const duration = (currentTime - log.entryTime) / 1000 / 60 / 60;
    return res.status(200).json({ active: true, name:log.slotName, duration:duration });
  }
  res.status(200).json({ active: false });
}

module.exports = {
  handleEntry,
  handleExit,
  checkParkingStatus
};
