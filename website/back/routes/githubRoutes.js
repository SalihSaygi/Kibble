import express from 'express'
const passportRouter = express.Router()

import passport from 'passport'

passportRouter.get('/github',
  passport.authenticate('github', { scope: [ 'user' ] }));

passportRouter.get('/github/callback', 
  passport.authenticate('github', { 
      failureRedirect: '/login/failed', 
      successRedirect: '/login/success'})
);

passportRouter.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  }
});

// when login failed, send failed msg
passportRouter.get("/login/failed", (req, res) => {
  res.status(401);
});

passportRouter.get('/logout', function(req, res){
  req.logout();
  res.redirect(req.hostname);
});

export default passportRouter