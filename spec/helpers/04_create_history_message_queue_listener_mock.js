(() => {
  let amqpLibMock = require('amqplib-mocks');

  container.register('amqpLib', amqpLibMock).asValue().cached();

  const primalChatHistoryQueueListener = container.resolve('chatHistoryQueueListener');
  let chatHistoryQueueListenerMock = jasmine.createSpy('chatHistoryQueueListenerMock');

  container.register('chatHistoryQueueListener', chatHistoryQueueListenerMock)
    .asValue()
    .cached();

  global.primalModules.chatHistoryQueueListener = primalChatHistoryQueueListener;
})();
