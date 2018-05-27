module.exports = (errorLogger, moment, errorLoggingHandler) => {
  return (middleware) => {
    return (socket, next) => {
      middleware(socket, next)
        .catch((err) => {
          errorLoggingHandler(err);

          return next(err);
        });
    }
  };
};