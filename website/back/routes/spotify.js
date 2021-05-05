import { login, lyrics, refresh } from '../controllers/spotifyController.js'
import express from 'express'
const spotifyRouter = express.Router()

spotifyRouter.post('/refresh', refresh)
spotifyRouter.post('/login', login)
spotifyRouter.get('/lyrics', lyrics)
// spotifyRouter.get('/mysongs', userSongs)

export default spotifyRouter