module.exports = (Message) => {

  return async (socket, next) => {
    let messageHistory = await Message
      .find({})
      .sort({created_at: 'desc'})
      .limit(10);

    messageHistory.reverse().forEach((message) => {
      socket.send(message.content);
    });

    next();
  };
};