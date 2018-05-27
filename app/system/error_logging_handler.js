module.exports = (moment, errorLogger) => {

  return async (err) => {
    await errorLogger.error(`[${moment().format('DD/MMM/YYYY:HH:mm:ss +SSS')}] ${err.message}.`);
  };
};