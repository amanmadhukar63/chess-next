import { connect, connection } from 'mongoose';

export default async function connectDB(){
  try {
  
    if (connection.readyState >= 1) {
      console.log('🟢 Already connected to the database');
      return;
    }

    await connect(process.env.DB_URL);

    connection.on('error', (error) => {
      console.log('Error while connecting to database, db is down: error - ', error);
      process.exit(1);
    });

    console.log('🟢 Connected to database');

  } catch (error) {
    console.log('❌ Error while connecting to database: error - ', error);
  }
}