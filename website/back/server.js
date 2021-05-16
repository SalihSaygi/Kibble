import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db.js';
import { SESSION_OPTIONS } from './config/session.js';
//Config Imports
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import morgan from 'morgan';
import methodOverride from 'method-override';
//Passport
import passport from 'passport';
import passportConfig from './auth/passport.js';
//Redis Imports
import connectRedis from 'connect-redis';
import client from './redisClient.js';
//Route Imports
import userRouter from './routes/userRoutes.js';
import botRouter from './routes/botRoutes.js';
import priviligedRouter from './routes/privilegedRoutes.js';
//Password Route Imports
import passwordRouter from './routes/passwordRoutes.js';
//Dev Test Data Imports
import setupRouter from './routes/setupRoutes.js';
//3rd Part API Imports
import spotifyRouter from './routes/spotify.js';
// import youtubeRoutes from './routes/youtube.js'
//Passport Router Import
import githubRouter from './routes/githubRoutes.js';
import localRouter from './routes/localRoutes.js';
//Middlewae Imports
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js';

passportConfig(passport);
connectDB();

const app = express();

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
  })
);
app.use(helmet());

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

//Session

const RedisStore = connectRedis(session);

client.on('error', function (error) {
  console.dir(error);
  console.error('Redis Error');
});
client.on('ready', function () {
  console.dir('Redis connection is ready');
});
client.on('end', function () {
  console.dir('Redis connection closed');
});

const store = new RedisStore({ client });

app.use(session({ ...SESSION_OPTIONS, store }));

//Pasport Auth
app.use(passport.initialize());
app.use(passport.session());

//Passport Routes
app.use('/auth', githubRouter);
app.use('/admin', localRouter);
//Setup Route
app.use('/setup', setupRouter);
//API Routes
app.use('/api/bots', botRouter);
app.use('/api/users', userRouter);
app.use('/api/privileged', priviligedRouter);
app.use('/password', passwordRouter);
app.use('/audio/spotify', spotifyRouter);
// app.use('audio/youtube', youtubeRouter)

//Production Build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// app.post('/token', (req, res) => {
//   const refreshToken = req.body.apiToken;
//   if (refreshToken == null) return res.sendStatus(401);
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     const accessToken = generateAccessToken({ name: user.name });
//     res.json({ accessToken: accessToken });
//   });
// });

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} environment on ${PORT}`
  )
);
