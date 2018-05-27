module.exports = (errorLogger, moment, errorLoggingHandler) => {
  return (middleware) => {
    return (socket, next) => {
      middleware(socket, next)
        .catch()
        .catch(async (err) => {
          await errorLoggingHandler(err);

          return next(err);
        });
    }
  };
};