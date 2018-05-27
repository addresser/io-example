module.exports = (errorLoggingHandler) => {

  return async (err) => {
    await errorLoggingHandler(err);

    process.exit(1);
  };
};