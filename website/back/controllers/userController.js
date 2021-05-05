import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { clearKey } from '../services/cache.js'

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).populate('Bot').lean().cache({ time: 10 });
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate('Bot').lean().cache();
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate('Bot').lean().cache();

  if (user) {
    res.json({
      user
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//Get logged in user's sepcified bot
//api/users/profile/bots/:id
const getUsersOneBotById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate('Bot').lean().cache();
  const bot = await Bot.findById(req.params.id)
  if (user) {
    const { hasBots } = user
    if(hasBots.length > 0) {
      const selectedBot = hasBots.filter(hasBot => 
          hasBot._id === bot.id)
      res.json(selectedBot)
    } else {
      res.status(404);
      throw new Error('User has no bots')
    }
  } else {
    res.status(404);
    throw new Error('User not found')
  }
})

//Get logged in user's bots
//api/users/profile/bots
const getUsersBotsById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate('Bot').lean().cache();

  if (user) {
    const { hasBots } = user
    if(hasBots.length > 0) {
      res.json(hasBots)
    } else {
      res.status(404);
      throw new Error('User has no bots')
    }
  } else {
    res.status(404);
    throw new Error('User not found')
  }
})
//Normal Way
const enterApiToken = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).populate().lean().cache()

    const apiToken = req.body.apiToken

    if(user) {
        user.apiToken = apiToken
        const updatedUser = await user.save()
        res.json({
          _id: updatedUser._id,
          githubId: updatedUser.githubId,
          displayName: updatedUser.displayName,
          image: updatedUser.image, 
          hasBots: updatedUser.hasBots
        })
    } else {
      res.status(404);
      throw new Error('Error entering api token')
    }
})

export { 
  getUsers, 
  getUserById, 
  getUserProfile, 
  getUsersOneBotById, 
  getUsersBotsById, 
  enterApiToken 
}
