const Moonstone = require('moonstone-wrapper');
const ytdl = require('ytdl-core-discord');

const Connect = bot_token => {
  const bot = MoonStone(bot_token);
  return bot;
};
