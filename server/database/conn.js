// ./database/conn.js
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/'; // Replace 'mydatabase' with the name of your database

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB database!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connect;
