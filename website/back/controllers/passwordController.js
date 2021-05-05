import crypto from 'crypto'
import Privileged from '../models/privilegedModel.js';
import passportLocalMongoose  from 'passport-local-mongoose'

const forgot = async(req, res) => {
    const token = (await promisify(crypto.randomBytes)(20)).toString('hex');
    const user = Privileged.find(user => user.email === req.body.email);

    if (!user) {
        return
        // return res.redirect('/forgot');
    }

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 60; //1 hour

        sendEmail({
        to: user.email,
        from: 'KibbleBot1337@gmail.com',
        subject: 'KibbleBot Password Reset',
        text: `
        Click this to reset your password
        http://${req.headers.host}/reset/${token}
        If you did not request this, please ignore this email and your password will remain unchanged.`})
}

const getToken = (req, res) => {
    const user = Privileged.find(u => (
        (u.resetPasswordExpires > Date.now()) &&
        crypto.timingSafeEqual(Buffer.from(u.resetPasswordToken), Buffer.from(req.params.token))
    ));

    if (!user) {
        return
        // return res.redirect('/forgot');
    }
}

const postToken = (req, res) => {
    const user = Privileged.find(u => (
    (u.resetPasswordExpires > Date.now()) &&
    crypto.timingSafeEqual(Buffer.from(u.resetPasswordToken), Buffer.from(req.params.token))
  ));

  if (!user) {
      return
    // return res.redirect('/forgot');
  }

  user.password = req.body.password;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpires;

    sendEmail({
        to: user.email,
        from: 'kibblebot1337@gmail.com',
        subject: 'Your password has been changed',
        text: `This is a confirmation that the password for your account "${user.email}" has just been changed.`
    })
}

const changePass = (req, res) => {
    Privileged.findOne({ _id: req.user.id },(err, user) => {
    // Check if error connecting
    if (err) {
        res.json({ success: false, message: err }); // Return error
    } else {
        // Check if user was found in database
        if (!user) {
        res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
        } else {
        user.changePassword(req.body.oldpassword, req.body.newpassword, function(err) {
            if(err) {
                    if(err.name === 'IncorrectPasswordError'){
                        res.json({ success: false, message: 'Incorrect password' }); // Return error
                    }else {
                        res.json({ success: false, message: 'Something went wrong!! Please try again after sometimes.' });
                    }
            } else {
            res.json({ success: true, message: 'Your password has been changed successfully' });
            }
        })
        }
    }
    })
}

export { forgot, getToken, postToken, changePass }