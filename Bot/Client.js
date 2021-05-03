require("dotenv").config();

const { raw, wrap, tokensToString, stringToToken } = require("@dogehouse/kebab");
const { credentials } = require ('./credentials')

const Client = async () => {
  try {
    const wrapper = wrap(await raw.connect(
      credentials.accessToken,
      credentials.refreshToken,
      {
        onConnectionTaken: () => {
          console.error("\nAnother client has taken the connection");
          process.exit();
        }
      }
    ));
    return wrapper
  } catch(e) {
    if (e.code === 4001) console.error("invalid token!");
    console.error(e)
  }
    
};

export default Client