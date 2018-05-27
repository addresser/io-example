(() => {
  const primalRelativeMessageQueueListener = container.resolve('relativeMessageQueueListener');
  let relativeMessageQueueListenerMock = jasmine.createSpy('relativeMessageQueueListenerMock');

  const primalChatFacade = container.resolve('chatFacade');
  let chatFacadeMock = jasmine.createSpyObj('chatFacadeMock', ['sendMessage']);

  chatFacadeMock.sendMessage.and.callFake((message) => {
    container.resolve('io').of('/chat').emit('message', message);
  });

  container.registerBulk({
    chatFacade: chatFacadeMock,
    relativeMessageQueueListener: relativeMessageQueueListenerMock,
  }).asValue()
    .cached();

  global.primalModules.chatFacade = primalChatFacade;
  global.primalModules.relativeMessageQueueListener = primalRelativeMessageQueueListener;
})();