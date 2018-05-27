module.exports = (amqpChatItems, handlerWrap, amqpMessageHandler) => {
  return async () => {
    let initAMQPChatItems = await amqpChatItems;

    let channel = initAMQPChatItems.channel;
    let chatHistoryQueue = initAMQPChatItems.chatHistoryQueue;

    await channel.consume(chatHistoryQueue.queue,
      handlerWrap(amqpMessageHandler(channel).historyMessageQueue)
    );
  }
};
