import { raw, wrap } from '@dogehouse/kebab';

class ManagerBot {
  constructor() {}
  initialize(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    const ManagerBot = wrap(
      await raw.connect(this.accessToken, this.refreshToken, {
        onConnectionTaken: () => {
          console.error('\nAnother client has taken the connection');
          process.exit();
        },
      })
    );

    return ManagerBot;
  }

  async createBot(name) {
    const ManagingBot = this.initialize();
    try {
      const botData = await ManagingBot.mutation.userCreateBot(name);
      if (botData.isUsernameTaken === true) {
        throw new Error('Bot with this name already exists.');
      }
      if (!botData.error === null) {
        throw new Error(bot.error);
      }
      console.log(botData);
      return botData;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default ManagerBot;
