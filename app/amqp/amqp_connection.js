module.exports = (amqpLib, amqpConfig) => {
  let amqpConnection = amqpLib.connect(amqpConfig);

  return amqpConnection;
};