import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import { MONGO_OPTIONS } from './config/db.js'
import gfs from './gfs.js'

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV.trim() === 'dev') {
      const connect = await mongoose.connect(process.env.LOCAL_MONGO_URI, MONGO_OPTIONS)
      connect.once('open', () => {
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('uploads');
      });
      console.log(`DEV: MongoDB Connected: ${connect.connection.host}`)
    } else {
    const connect = await mongoose.connect(process.env.MONGO_URI, MONGO_OPTIONS)
    connect.once('open', () => {
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('uploads');
      });
      console.log(`PROD: MongoDB Connected: ${connect.connection.host}`)
      console.log(process.env.NODE_ENV)
    }
  } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exit(1)
  }
}

export default connectDB
