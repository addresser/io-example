(() => {
  const primalChatHistoryMiddleware = container.resolve('chatHistoryMiddleware');
  let chatHistoryMiddlewareMock = jasmine.createSpy('chatHistoryMiddlewareMock').and.callFake(async (socket, next) => {
    next();
  });

  const primalLoggingMiddleware = container.resolve('loggingMiddleware');
  let loggingMiddlewareMock = jasmine.createSpyObj('loggingMiddlewareMock', ['login']);
  loggingMiddlewareMock.login.and.callFake((socket, next) => {
      next();
  });

  const primalJWTAuthenticator = container.resolve('jwtAuthenticator');
  let jwtAuthenticatorMock = jasmine.createSpy('jwtAuthenticatorMock').and.callFake((socket, next) => {
    socket.decoded_token = {
      name: 'username',
      email: 'email@mail.ru'
    };

    next();
  });

  container.registerBulk({
    jwtAuthenticator: jwtAuthenticatorMock,
    loggingMiddleware: loggingMiddlewareMock,
    chatHistoryMiddleware: chatHistoryMiddlewareMock,
  }).asValue()
    .cached();

  global.primalModules = {
    jwtAuthenticator: primalJWTAuthenticator,
    loggingMiddleware: primalLoggingMiddleware,
    chatHistoryMiddleware: primalChatHistoryMiddleware,
  };
})();