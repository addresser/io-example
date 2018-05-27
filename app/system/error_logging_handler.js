module.exports = (moment, errorLogger) => {

  return (err) => {
    errorLogger.error(`[${moment().format('DD/MMM/YYYY:HH:mm:ss +SSS')}] ${err.message}.`);
  };
};