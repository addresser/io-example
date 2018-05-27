module.exports = (io, jwtAuthenticator, socketEventListener,
  loggingMiddleware, chatHistoryMiddleware, middlewareWrap) => {

  return (io) => {
    let chat = io.of('/chat');

    chat.use(jwtAuthenticator);
    chat.use(middlewareWrap(chatHistoryMiddleware));
    chat.use(loggingMiddleware.login);

    chat.on('connection',
      socketEventListener
    );

    return chat;
  };
};