module.exports = (errorLoggingHandler) => {

  return (err) => {
    errorLoggingHandler(err);

    process.exit(1);
  };
};