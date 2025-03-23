import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve()));
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://192.168.217.49:5173',
    'https://8479-152-59-85-173.ngrok-free.app',
    'https://*.ngrok-free.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// WebSocket Section (Commented)
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://parklink-rohanmaiti.onrender.com'],
    methods: ['GET', 'POST']
  }
});
const port = new SerialPort({
  path: 'COM3',
  baudRate: 9600
});
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
io.on('connection', (socket) => {
  console.log('A new user connected');
  socket.emit('initialData', { message: 'Initial data' });
  parser.on('data', (data) => {
    console.log('Received from Arduino:', data);
    io.emit('arduinoData', { sensorData: data });
  });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, '0.0.0.0', async () => {
  console.log(`Server started at port ${PORT}`);
  try {
    await connectDB();
    console.log('Connected to DB');
  } catch (err) {
    console.log('Error connecting to DB', err);
  }
});

import authRoutes from './routes/auth.route.js';
import parkingRoutes from './routes/parking.route.js';

app.use('/api/auth', authRoutes);
app.use('/api/parking', parkingRoutes);

// Serve frontend in production
app.use(express.static(path.join(path.resolve(), '../frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve(), '../frontend/dist/index.html'));
});
