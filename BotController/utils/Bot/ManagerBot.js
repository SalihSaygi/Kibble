import Moonstone from 'moonstone-wrapper';

class ManagerBot {
  constructor() {}
  initialize(accessToken, refreshToken) {
    const ManagerBot = Moonstone({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    return ManagerBot;
  }
}

export default ManagerBot;
