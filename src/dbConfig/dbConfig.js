import { connect, connection } from 'mongoose';

export default async function connectDB(){
  try {
  
    await connect(process.env.DB_URL);

    connection.on('error', (error) => {
      console.log('Error while connecting to database, db is down: error - ', error);
      process.exit(1);
    });

    connection.on('connected', () => {
      console.log('Connected to database');
    });

  } catch (error) {
    console.log('Error while connecting to database: error - ', error);
  }
}