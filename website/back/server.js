import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db.js'
import {SESSION_OPTIONS} from './config/session.js'
//Config Imports
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import session from 'express-session'
import morgan from 'morgan'
import methodOverride from 'method-override'
//Passport
import passport from 'passport'
import passportConfig from "./auth/passport.js"
//Redis Imports
import connectRedis from 'connect-redis'
import client from './redisClient.js'
//Route Imports
import userRouter from './routes/userRoutes.js'
import botRouter from './routes/botRoutes.js'
import priviligedRouter from './routes/privilegedRoutes.js'
//Password Route Imports
import passwordRouter from './routes/passwordRoutes.js'
//Dev Test Data Imports
import setupRouter from './routes/setupRoutes.js'
//3rd Part API Imports
import spotifyRouter from './routes/spotify.js'
// import youtubeRoutes from './routes/youtube.js'
//Passport Router Import
import githubRouter from './routes/githubRoutes.js'
import localRouter from './routes/localRoutes.js';
//Middlewae Imports
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'

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
app.use(methodOverride('_method'));

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
app.use('/api/privileged', priviligedRouter)
app.use('/password', passwordRouter)
app.use('/audio/spotify', spotifyRouter)
// app.use('audio/youtube', youtubeRouter)

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


// let gfs;

// conn.once('open', () => {
//   // Init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// // Create storage engine
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
// const upload = multer({ storage });

// // @route GET /
// // @desc Loads form
// app.get('/', (req, res) => {
//   gfs.files.find().toArray((err, files) => {
//     // Check if files
//     if (!files || files.length === 0) {
//       res.render('index', { files: false });
//     } else {
//       files.map(file => {
//         if (
//           file.contentType === 'image/jpeg' ||
//           file.contentType === 'image/png'
//         ) {
//           file.isImage = true;
//         } else {
//           file.isImage = false;
//         }
//       });
//       res.render('index', { files: files });
//     }
//   });
// });

// // @route POST /upload
// // @desc  Uploads file to DB
// app.post('/upload', upload.single('file'), (req, res) => {
//   // res.json({ file: req.file });
//   res.redirect('/');
// });

// // @route GET /files
// // @desc  Display all files in JSON
// app.get('/files', (req, res) => {
//   gfs.files.find().toArray((err, files) => {
//     // Check if files
//     if (!files || files.length === 0) {
//       return res.status(404).json({
//         err: 'No files exist'
//       });
//     }

//     // Files exist
//     return res.json(files);
//   });
// });

// // @route GET /files/:filename
// // @desc  Display single file object
// app.get('/files/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if file
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: 'No file exists'
//       });
//     }
//     // File exists
//     return res.json(file);
//   });
// });

// // @route GET /image/:filename
// // @desc Display Image
// app.get('/image/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if file
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: 'No file exists'
//       });
//     }

//     // Check if image
//     if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
//       // Read output to browser
//       const readstream = gfs.createReadStream(file.filename);
//       readstream.pipe(res);
//     } else {
//       res.status(404).json({
//         err: 'Not an image'
//       });
//     }
//   });
// });

// // @route DELETE /files/:id
// // @desc  Delete file
// app.delete('/files/:id', (req, res) => {
//   gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
//     if (err) {
//       return res.status(404).json({ err: err });
//     }

//     res.redirect('/');
//   });
// });


// //--------------------
// const storage = new GridFsStorage({
//   url: config.db,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {  
//       // if you are using a separate collection to store data 
//       // there is no need to save this information on the metadata
//       // because you'll probably never use it
//       const filename = req.body.fileName + path.extname(file.originalname);
//       const fileInfo = {
//         filename: filename,
//         bucketName: 'contents'
//       }
//       resolve(fileInfo);
//     });
//   }
// });
// const upload = multer({
//   storage
// });

// //** uploading file to the db */
// router.post('/', upload.any(), (req, res) => {
//   const movie = new movies({
//     description: req.body.Description,
//     category: req.body.Category,
//     // Grab the file id that was stored in the database by the storage engine as the reference to your file
//     fileID: req.file._id
//   })

//   movie.save()
// });