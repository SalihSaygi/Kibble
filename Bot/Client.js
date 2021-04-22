const { wrap } = require('@dogehouse/kebab')
const { Client: Kibble } = require('dogehouse.js')
const Client = async ({
  token,
  refreshToken,
}) => {
  const connection = await Kibble.connect(token, refreshToken, {
    onConnectionTaken: console.error,
  });
  return wrap(connection).subscribe.newChatMsg((message))
};

module.export = createClient;
