import lyricsFinder from 'lyrics-finder'
import SpotifyWebApi from 'spotify-web-api-node'
import { SPOTIFY_OPTIONS } from '../config/spotify.js'
import asyncHandler from 'express-async-handler'

const refresh = (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        SPOTIFY_OPTIONS, 
        refreshToken
    })

    spotifyApi.refreshAccessToken()
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in
        })
    }).catch(err => {
        console.error(err)
        res.sendStatus(400)
    })
}

const login = (req, res) => {
    const queryCode = req.body.code
    const spotifyApi = new SpotifyWebApi({
        SPOTIFY_OPTIONS
    })

    spotifyApi.authorizationCodeGrant(queryCode)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            })
        }).catch(() => {
            res.sendStatus(400)
    })
}

const lyrics = asyncHandler(async (req, res) => {
    const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
    res.json({ lyrics })
})

const userSongs = asyncHandler(async (req, res) => {

})


export { login, lyrics, refresh }