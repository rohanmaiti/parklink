import mongoose from 'mongoose';

function connectDB() {
  return mongoose.connect(process.env.MONGODB_URI);
}

export default connectDB;
