import mongoose from "mongoose";
import {config} from 'dotenv'

config();
// Connection URL
const connectDb = async () => {
  console.log('Connecting to database....')
  try {
    const MONGODB_URI = process.env.MONGODB_URI;

    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(MONGODB_URI, mongooseOptions);

    console.log('Connected to DB');
  } catch (error) {
    console.error('Mongoose connection error:', error);
  }
};

const disconnectDb = () => {
  mongoose.connection.close(() => {
    console.log('disconnected from DB');
    process.exit(0);
  });
};

export {
  connectDb,
  disconnectDb,
};
