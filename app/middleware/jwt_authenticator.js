module.exports = (socketioJWT) => {

  return socketioJWT.authorize({
    secret: process.env.JWT_SECRET,
    handshake: true
  });
};

