class BotResponse {
  constructor(botData) {
    this.botData = botData;
  }

  get apiKey() {
    return this.botData.apiKey;
  }

  get isUsernameTaken() {
    return this.botData.isUsernameTaken;
  }

  get error() {
    return this.botData.isUsernameTaken;
  }
}

export default BotResponse;
