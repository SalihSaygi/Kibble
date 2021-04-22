import GitHubStrategy from 'passport-github2'
GitHubStrategy.Strategy
import User from '../models/userModel.js'
import dotenv from 'dotenv'
dotenv.config()

const githubPassport = (passport) => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.HOST}/auth/github/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
          console.log('1')
        try {
          const user = await User.findOne({ githubId: profile.id })
          console.log('2')
          if (user) {
            done(null, user)
            console.log('3')
          } else {
            const newUser = {
              githubId: profile.id,
              displayName: profile.displayName,
              image: profile.photos[0].value,
              email: profile.emails[0].value,
            }
            const savedUser = await newUser.save()
            done(null, savedUser)
            console.log('4')
          }
        } catch (err) {
          console.error(err)
          console.log('5')
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}

export default githubPassport