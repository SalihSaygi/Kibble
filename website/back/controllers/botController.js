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

const createBot = async (req, res, next) => {
  console.log(process.env.BOT_ACCESS_TOKEN);
  console.log(process.env.BOT_REFRESH_TOKEN);

  BotManagerAccount.on('ready', async user => {
    console.log('Ready! Logged in as ' + user.username);

    try {
      const botManagerAccountData = await BotManagerAccount.createBotAccount(
        'KibbleTest4'
      );
      if (botManagerAccountData.isUsernameTaken === true) {
        res.status(400).json({ message: 'Bot with this name already exists.' });
        console.log('Bot with this name already exists.');
        throw new Error('Bot with this name already exists.');
      }
      console.log(botManagerAccountData.apiKey);
      const apiKey = botManagerAccountData.apiKey;
      const bot = Moonstone(apiKey);
      bot.on('ready', async user => {
        console.log('Ready! Logged in as ' + user.username);
        const topRooms = await bot.getTopRooms();
        console.log('There are ' + topRooms.length + ' available rooms.');

        const foundRooms = topRooms.filter(
          room => room.creatorId == user.currentRoomId // Filter for rooms created by a specific user
        );

        // If the filter found a room, join it, otherwise create one.
        const room =
          foundRooms.length > 0 ? foundRooms[0] : res.redirect('/api/rooms/');
        // : await bot.createRoom({
        //     name: req.body.RoomName,
        //     description: req.body.description,
        //     privacy: 'public',
        //   });
        await bot.joinRoom(room); // Join room
      });
      bot.connect();
    } catch {
      console.log('error');
    }
  });
  BotManagerAccount.connect();
};

export { getBots, getBotById, updateBot, createBot };
