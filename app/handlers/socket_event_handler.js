module.exports = (chatFacade) => {

  return (socket) => {
    class SocketEventHandler {

      async messageEvent(message) {

        await chatFacade.sendMessage(new Buffer(`${socket.decoded_token.name}: ${message}`));
      }
    }

    return new SocketEventHandler();
  };
};