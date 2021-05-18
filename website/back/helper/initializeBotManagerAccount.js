import Moonstone from 'moonstone-wrapper';
import dotenv from 'dotenv';
dotenv.config();

const initializeBotManagerAccount = () => {
  const BotManagerAccount = Moonstone({
    accessToken: process.env.BOT_ACCESS_TOKEN,
    refreshToken: process.env.BOT_REFRESH_TOKEN,
  });
  return BotManagerAccount;
};

const createBot = async botName => {
  const BotManagerAccount = initializeBotManagerAccount();
  BotManagerAccount.on('ready', async user => {
    console.log('Ready! Logged in as ' + user.username);

    try {
      const botManagerAccountData = await BotManagerAccount.createBotAccount(
        botName
      );
      if (botManagerAccountData.isUsernameTaken === true) {
        res.status(400).json({ message: 'Bot with this name already exists.' });
        console.log('Bot with this name already exists.');
        throw new Error('Bot with this name already exists.');
      }
      console.log(botManagerAccountData);
      return botManagerAccountData;
    } catch (err) {
      throw new Error(err);
    }
  });
};

const data = createBot();

const getApiKey = () => {
  return data.apiKey;
};

const getError = () => {
  return data.error;
};

const getUsernameTaken = () => {
  return data.isUsernameTaken;
};

const validateError = error => {
  if (!error === null) {
    throw new Error(error);
  }
};

export { initializeBotManagerAccount, createBot };
