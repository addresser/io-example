module.exports = {
  apps : [
    {
      name: "first-io-example",
      script: "./server.js",
      watch: false,
      exec_mode: "fork",
      autorestart: true,
      env: {
        APP_PORT: 3001
      },
    },
    {
      name: "second-io-example",
      script: "./server.js",
      watch: false,
      exec_mode: "fork",
      autorestart: true,
      env: {
        APP_PORT: 3002
      },
    }
  ]
};
