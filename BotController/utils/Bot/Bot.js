import ManagerBot from './ManagerBot.js';

class Bot {
  constructor(name) {
    (this.name = name), this.botData, this.manager. this.room
  }

  initialize(accessToken, refreshToken) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.manager = new ManagerBot();
    const self = this
    const newBotData = self.initialize(accessToken, refreshToken)
    const credentials = await http.bot.auth(newBotData.apiKey);
    if (credentials) {
      this.botData = this.manager.initialize(
        credentials.accessToken,
        credentials.refreshToken
      );
    }
    const botData = this.manager.initialize(accessToken, refreshToken);
    return botData
  }

  joinPublicOrCreateOne(roomData = null) {
    const bot = this.initialize(this.accessToken, this.refreshToken);
    this.room = new Room();
    const user = this.manager.connection.user;
    const room = await Room.findPublic(bot, user);
    if (!room) {
      const room = Room.createPublic(bot, roomData);
      await bot.joinRoom(room);
      bot.connect();
    }
    await bot.joinRoom(room);
    bot.connect();
  }

  schedule(roomData = null, date, repeat = null) {
    const bot = this.initialize();
    if(repeat === null) {
      const 
    }
  }
}

export default Bot;
