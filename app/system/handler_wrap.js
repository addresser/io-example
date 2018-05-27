module.exports = (errorLoggingHandler) => {
  return (handler) => {
    return (message) => {
      handler(message).catch(errorLoggingHandler);
    }
  };
};