module.exports = (Message, io) => {

  return (channel) => {

    class AMQPMessageHandler {
      async relativeMessageQueue(message) {
        io.of('/chat').emit('message', message.content.toString());

        channel.ack(message);
      }

      async historyMessageQueue(message) {
        let msg = new Message({
          content: message.content.toString(),
        });

        await  msg.save();

        channel.ack(message);
      }
    }

    return new AMQPMessageHandler();
  }
};