module.exports = (handlerWrap, socketEventHandler) => {

  return async (socket) => {
    socket.on('message', handlerWrap(socketEventHandler(socket).messageEvent));
  };
};
