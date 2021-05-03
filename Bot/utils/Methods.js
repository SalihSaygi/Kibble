import Client from '../Client.js'

const messageListener = (botCreator) => {
    Client.subscribe.newChatMsg(async ({ userId, msg }) => {
      let log = []
      const text = tokensToString(msg.tokens);
      log.push(text)
      console.log(`${msg.displayName} > ${text}`);
      if(userId === Client.connection.user.id) return;

      const [, command, parameters] = commandRegex.exec(text) ?? ["", ""];

      switch(command) {
        case "help":
          await Client.mutation.sendRoomChatMsg(stringToToken("Commands: /help, /goto (owner only), /to_base64 <text>, /from_base64 <buffer>"));
          break;
        case "goto":
          if(msg.username !== botCreator || parameters.length == 0) break;

          await Client.mutation.leaveRoom();
          await Client.query.joinRoomAndGetInfo(parameters);

          break;
        case "to_base64":
          if(parameters.length == 0) break;

          await Client.mutation.sendRoomChatMsg(stringToToken(Buffer.from(parameters, "utf-8").toString("base64")));

          break;
        case "from_base64":
          if(parameters.length == 0) break;

          await Client.mutation.sendRoomChatMsg(stringToToken(Buffer.from(parameters, "base64").toString("utf-8")));

          break;
      }
    });
}