import asyncHandler from 'express-async-handler';
import Bot from '../models/botModel.js';
import Moonstone from 'moonstone-wrapper';
import ytdl from 'ytdl-core-discord';
import BotManagerAccount from '../helper/initializeBotManagerAccount.js';

const getBots = asyncHandler(async (req, res) => {
  const bots = await Bot.find({})
    .populate('User')
    .sort({ updatedAt: 'desc' })
    .lean();
  res.json(bots);
});

const getBotById = asyncHandler(async (req, res) => {
  const bot = await (await Bot.findById(req.params.id))
    .populated('User')
    .lean();
  if (bot) {
    res.json(bot);
  } else {
    res.status(404);
    throw new Error('Bot not found');
  }
});

//POST
const updateBot = asyncHandler(async (req, res) => {
  const { displayName, image, token, refreshToken, createdBy } = req.body;

  const bot = await Bot.findById(req.params.id).populated('user').lean();

  if (bot) {
    (bot.displayName = displayName),
      (bot.image = image),
      (bot.token = token),
      (bot.refreshToken = refreshToken),
      (bot.createdBy = createdBy);

    const updatedBot = await bot.save();
    res.json(updatedBot);
  } else {
    res.status(404);
    throw new Error('Bot not found');
  }
});

const createBot = asyncHandler(async (req, res, next) => {
  // console.log(req.botToken);
  // const botToken = req.botToken;
  // const bot = Moonstone(botToken);
  // console.log('BOT CREATED');

  // if (!BotManagerAccount) {
  //   res.status(400).json({ message: 'Bot Manager has not been initialized.' });
  //   console.log('Bot Manager has not been initialized.');
  // } else if (!bot) {
  //   res.status(400).json({ message: 'Could not create the bot.' });
  //   console.log('Could not create the bot.');
  // }
  console.log(process.env.BOT_ACCESS_TOKEN);
  console.log(process.env.BOT_REFRESH_TOKEN);

  const BotManagerAccount = Moonstone({
    accessToken: process.env.BOT_ACCESS_TOKEN,
    refreshToken: process.env.BOT_REFRESH_TOKEN,
  });

  BotManagerAccount.on('ready', async user => {
    console.log('Ready! Logged in as ' + user.username);

    try {
      const botManagerAccountData = await BotManagerAccount.createBotAccount(
        'KibbleBot'
      );
      const apiKey = botManagerAccountData.apiKey;
      console.log(apiKey);
      console.log(botManagerAccount);
    } catch {
      console.log('error');
    }
  });
  BotManagerAccount.connect();
});

export { getBots, getBotById, updateBot, createBot };
