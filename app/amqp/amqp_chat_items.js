module.exports = (amqpConnection, connectErrorHandler, amqpMessageHandler, handlerWrap) => {

  let amqpChatItems = amqpConnection
    .then(async (connection) => {

      let channel = await connection.createChannel();
      let chatExchange = await channel.assertExchange('chat', 'fanout');
      let relativeMessageQueue =  await channel.assertQueue('', {exclusive: true});
      let chatHistoryQueue =  await channel.assertQueue('chat_history');

      await channel.bindQueue(relativeMessageQueue.queue, chatExchange.exchange);
      await channel.bindQueue(chatHistoryQueue.queue, chatExchange.exchange);

      return {
        initialized: false,

        channel: channel,
        chatExchange: chatExchange,
        relativeMessageQueue: relativeMessageQueue,
        chatHistoryQueue: chatHistoryQueue,
      };
    })
    .catch(connectErrorHandler);

  return amqpChatItems;
};