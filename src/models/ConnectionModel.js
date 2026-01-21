require('dotenv').config();

const mongoose = require('mongoose');
const connectToDatabase = async () => {
  console.log('database url:', process.env.DATABASE_URL);
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    
    console.log('MongoDB connected successfully');

    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = { connectToDatabase, mongoose };
