import asyncHandler from 'express-async-handler'
import Privilieged from '../models/privilegedModel.js'

const admin = asyncHandler(async (req, res, next) => {

    const exists = await Privileged.exists({ username: "admin" });

	if (exists) {
		res.redirect(`${req.hostname}/admin/login`);
		return;
	};
    bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash(process.env.ADMIN_PASS, salt, function (err, hash) {
			if (err) return next(err);
			
			const newAdmin = new Privileged({
				username: "admin",
				password: hash,
                roles: "admin"
			});

			newAdmin.save()
                .then((user) => {
                    console.log(user)
                });

			res.redirect(`${req.hostname}/admin/dashboard`);
		});
	});
 });

 const dev = asyncHandler(async (req, res, next) => {

    await Privileged.count({ roles: "dev" }, function(err, count) {
		if(err) return NodeList(err)
        if(count > 5) {
            res.redirect('/login')
            return
        }
    });


    bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash(req.body.password, salt, function (err, hash) {
			if (err) return next(err);
			
			const newDev = new Privileged({
				username: "req.body.username",
				password: hash,
                roles: "developer"
			});

			newDev.save()
                .then((user) => {
                    console.log(user)
                });

			res.redirect(`${req.hostname}/admin/dashboard`);
		});
	});
});

export { admin, dev }