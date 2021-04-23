import LocalStrategy from ('passport-local');
LocalStrategy.Strategy
import Privileged from '../models/privilegedModel'
import bcrypt from bcryptjs
import dotenv from 'dotenv'
dotenv.config()

//Just Login 
export const localPassport = (passport) => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      // Match user
      Privileged.findOne({
        username: username
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
              req.session.destroy()
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};