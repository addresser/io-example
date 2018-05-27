(() => {
  const Dizzy = require('dizzy');
  const appServiceProvider = require('../../app/service_providers/app_service_provider');

  let container = appServiceProvider(Dizzy);

  global.container = container;
})();