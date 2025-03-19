const express = require("express");
const path = require("path")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const http = require('http');
const {SerialPort} = require('serialport');
const {ReadlineParser} = require("@serialport/parser-readline")
const { Server } = require("socket.io");
const { Socket } = require("dgram");
const dotenv = require("dotenv");
dotenv.config();
const server = http.createServer(app);
// const io = new Server(server);

const connectDB = require("./lib/db.js");
const exp = require("constants");


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname));
app.use(cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.217.49:5173",
      "https://8479-152-59-85-173.ngrok-free.app",
      "https://*.ngrok-free.app"
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  }));
  
  


// HAVE TO TURN OFF THIS SECTION IF USB TO ARDUINO IS NOT CONNECTED
// WEBSOCKET CONNECTION START HERE
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST']
//   }
// });
// const port = new SerialPort({
//     path: 'COM3',
//     baudRate: 9600
// });
// const parser = port.pipe(new ReadlineParser({delimiter:'\r\n' }));
// io.on('connection', (socket) => {
//     console.log('A new user connected');
//     // Emit the initial data if needed
//     socket.emit('initialData', { message: 'Initial data' });
//     // Listen for data from the Arduino and emit it to the connected clients
//     parser.on('data', (data) => {
//         console.log('Received from Arduino:', data);
//         io.emit('arduinoData', { sensorData: data });
//     });
//     // Disconnect event
//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// });
// WEBSOCKET CONNECTION ENDS HERE

const PORT = process.env.PORT;
server.listen(PORT,'0.0.0.0', () => {
    console.log("Server started at port 4000");
    connectDB()
    .then((res)=>{
        console.log("connected to DB");
    })
    .catch(err=>{
        console.log("error connectiong to DB");
    })
});

const authRoutes = require("./routes/auth.route.js");
const parkingRoutes = require("./routes/parking.route.js");
app.use("/api/auth", authRoutes);
app.use("/api/parking", parkingRoutes);

const __dirname = path.resolve();
if(process.env.NODE_ENV == "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  })
}
