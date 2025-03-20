import ParkingLog from '../models/parking.model.js';

const SECRET_STRING_ENTRY = 'mySecret123';
const SECRET_STRING_EXIT = 'mySecret123_Exit';

async function handleEntry(req, res) {
  console.log('handleEntry function');
  const { qrData, name } = req.body;
  const email = req.user.email;

  if (qrData !== SECRET_STRING_ENTRY) {
    return res.status(400).json({ message: 'Invalid QR Code' });
  }

  const existingLog = await ParkingLog.findOne({ email, exitTime: null });
  // console.log('handleEntry function till here 0');
  console.log(existingLog);
  if (existingLog) {
    return res.status(400).json({ message: 'User already parked' });
  }
  // console.log('handleEntry function till here 1');

  const newLog = new ParkingLog({ email, entryTime: new Date(), slotName: name });
  await newLog.save();
  console.log('handleEntry function till here 2');

  res.status(200).json({ message: 'Entry recorded successfully' });
}

async function handleExit(req, res) {
  const { qrData, name } = req.body;
  const email = req.user.email;

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
  res.status(200).json({ message: 'Exit recorded', duration });
}

async function checkParkingStatus(req, res) {
  const { name } = req.body;
  const email = req.user.email;

  const log = await ParkingLog.findOne({ email, exitTime: null, slotName: name });
  if (log) {
    const currentTime = new Date();
    const duration = (currentTime - log.entryTime) / 1000 / 60 / 60;
    return res.status(200).json({ active: true, name: log.slotName, duration });
  }

  res.status(200).json({ active: false });
}

export { handleEntry, handleExit, checkParkingStatus };
