module.exports = (amqpChatItems, handlerWrap, amqpMessageHandler) => {
  return async () => {
    let initAMQPChatItems = await amqpChatItems;

    let channel = initAMQPChatItems.channel;
    let relativeMessageQueue = initAMQPChatItems.relativeMessageQueue;

    await channel.consume(relativeMessageQueue.queue,
      handlerWrap(amqpMessageHandler(channel).relativeMessageQueue)
    );
  }
};
