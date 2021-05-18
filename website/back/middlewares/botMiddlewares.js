const checkBotInitialize = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect(`${HOST}/auth/github`);
  }
  if (BotManagerAccount) {
    
  }
};

const connectBot