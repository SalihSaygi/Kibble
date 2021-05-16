import Moonstone from 'moonstone-wrapper';
import dotenv from 'dotenv';
dotenv.config();

const BotManagerAccount = Moonstone({
  accessToken: process.env.BOT_ACCESS_TOKEN,
  refreshToken: process.env.BOT_REFRESH_TOKEN,
});

export default BotManagerAccount;
