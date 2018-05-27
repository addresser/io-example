(() => {
  const mockerDataGenerator = require('mocker-data-generator');

  let dataGenerator = mockerDataGenerator.default;

  let dataSchemas = {
    messageDataSchema: {
      content: {
        faker: 'lorem.words'
      }
    }
  };

  global.dataGenerators = {
    message: dataGenerator().schema('message', dataSchemas.messageDataSchema, 1),
  };
})();