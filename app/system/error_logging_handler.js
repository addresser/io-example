module.exports = (moment, errorLogger) => {

  return async (err) => {
    errorLogger.error(`[${moment().format('DD/MMM/YYYY:HH:mm:ss +SSS')}] ${err.message}.`);
  };
};