import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import util from 'util'
import passport from 'passport'
import mongoose from 'mongoose'
import connectDB from './db.js'
import {SESSION_OPTIONS} from './config/session.js'
import cors from 'cors'
import helmet from 'helmet'
import session from 'express-session'
import morgan from 'morgan'
import passportConfig from "./auth/passport.js"
//Redis Imports
import connectRedis from 'connect-redis'
import client from './redisClient.js'
//Route Imports
import userRouter from './routes/userRoutes.js'
import botRouter from './routes/botRoutes.js'
import setupRouter from './routes/setupRoutes'
//3rd Part API Imports
import spotifyApi from './routes/spotify.js'
//Passport Router Import
import githubRouter from './routes/githubRoutes.js'
//Middlewae Imports
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'
import localRouter from './routes/localRoutes.js';

passportConfig(passport)
connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: process.env.ORIGIN_URL,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true
}))
app.use(helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//Session

const RedisStore = connectRedis(session)

client.on('error', function (error) {
  console.dir(error)
  console.error("Redis Error")
})
client.on("ready", function() {
  console.dir("Redis connection is ready")
})
client.on("end", function() {
  console.dir("Redis connection closed")
})

const store = new RedisStore({client})

app.use(
    session({ ...SESSION_OPTIONS, store})
)
//Pasport Auth
app.use(passport.initialize())
app.use(passport.session())
//Passport Routes
app.use('/auth', githubRouter)
app.use('/admin', localRouter)
//Setup Route
app.use('/setup', setupRouter)
//API Routes
app.use('/api/bots', botRouter)
app.use('/api/users', userRouter)
app.use('/api/spotify', spotifyApi)


const __dirname = path.resolve()
app.use('/uploads', 
  express.static(path.join(__dirname, '/uploads'))
)

//Production Build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} environment on ${PORT}`))