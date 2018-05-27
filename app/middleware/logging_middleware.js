module.exports = (infoLogger, moment) => {

  return {
    login: (socket, next) => {
      infoLogger.info(`[${moment().format('DD/MMM/YYYY:HH:mm:ss +SSS')}] ${socket.decoded_token.name} logged.`);

      next();
    },
  }
};