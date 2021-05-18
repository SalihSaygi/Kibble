import ManagerBot from './ManagerBot';
import BotResponse from './BotResponse';
import Moonstone from 'moonstone-wrapper';

class Bot extends ManagerBot {
  constructor(name) {
    (this.name = name), this.botData;
  }

  response() {
    const response = new BotResponse(this.botData);
    return response;
  }

  access() {
    const bot = Moonstone(this.response());
    return bot;
  }

  joinPublic() {
    const bot = this.access();
    bot.on('ready', async user => {
      console.log('Ready! Logged in as ' + user.username);
      const room = await Room.findPublic(bot);
      await bot.joinRoom(room);
    });
    bot.connect();
  }

  async create(accessToken, refreshToken) {
    const Manager = new ManagerBot();
    const ManagingBot = Manager.initialize(accessToken, refreshToken);
    ManagingBot.on('ready', async user => {
      console.log('Ready! Logged in as ' + user.username);
      try {
        const botData = await ManagingBot.createBotAccount(this.name);
        if (botData.isUsernameTaken === true) {
          throw new Error('Bot with this name already exists.');
        }
        if (!botData.error === null) {
          throw new Error(bot.error);
        }
        console.log(botData);
        this.botData = botData;
      } catch (err) {
        throw new Error(err);
      }
    });
  }
}

export default Bot;
