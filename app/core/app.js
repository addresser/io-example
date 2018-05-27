module.exports = (env, useStrict, http, io, chat) => {

  let app = http.createServer();

  io.attach(app, {
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  });

  chat(io);

  return app;
};