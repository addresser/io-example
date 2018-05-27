module.exports = (winston, loggerConfig, winstonFastRabbitMQ) => {

  let infoLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winstonFastRabbitMQ(loggerConfig),
    ],
    exitOnError: false,
  });

  return infoLogger;
};