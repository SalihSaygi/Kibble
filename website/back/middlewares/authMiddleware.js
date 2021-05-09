const HOST = process.env.HOST
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const ensureAuthUser  = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    } else {
        res.redirect(`${HOST}/auth/github`)
    }
    
}

export const ensureGuest = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect(`${HOST}/dashboard`)
    }
}

export const ensurePriviliged = (req, res, next) => {
  if(req.user) {
    return next()
  } else {
    res.redirect(`${HOST}/admin/login`)
  }
}

export function roleChecker(...permittedRoles) {
    return (req, res, next) => {
        const { user } = req
        if (user && 
            req.isAuthenticated() && 
            user.role && 
            permittedRoles.includes(user.role)
            ) {
            next();
        } else {
            res.status(401).json({ msg: 'You are not authorized to view this resource because you are not an admin.' });
            res.redirect(`${HOST}/dashboard`)
        }
    }
}

export function permit(...permittedRoles) {
  // return a middleware
  return (request, response, next) => {
    const { user } = request

    if (user && permittedRoles.includes(user.role)) {
      next(); // role is allowed, so continue on the next middleware
    } else {
      response.status(403).json({message: "Forbidden"}); // user is forbidden
    }
  }
}

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-apiToken');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('No token');
  }
});
