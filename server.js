let app = require('./app/app_build');

app.listen(process.env.APP_PORT, process.env.APP_HOST);
