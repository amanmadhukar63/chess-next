import mongoose from 'mongoose';

export default async function connectDB(){
  try {
  
    const connection = await mongoose.connect(process.env.DB_URL);

    connection.on('error', (error) => {
      console.log('Error while connecting to database: error - ', error);
    });

    connection.on('connected', () => {
      console.log('Connected to database');
    });

  } catch (error) {
    console.log('Error while connecting to database: error - ', error);
  }
}