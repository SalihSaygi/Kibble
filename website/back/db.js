import mongoose from 'mongoose';
import { MONGO_OPTIONS } from './config/db.js'

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV.trim() === 'dev') {
      const connect = await mongoose.connect(process.env.LOCAL_MONGO_URI, MONGO_OPTIONS)
      console.log(`DEV: MongoDB Connected: ${connect.connection.host}`)
    } else {
    const connect = await mongoose.connect(process.env.MONGO_URI, MONGO_OPTIONS)
      console.log(`PROD: MongoDB Connected: ${connect.connection.host}`)
      console.log(process.env.NODE_ENV)
    }
  } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exit(1)
  }
}

export default connectDB
