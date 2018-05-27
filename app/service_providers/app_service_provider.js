/**
 * @description app_service_provider создает di-контейнер и регистрирует зависимости.
 * @module ./service_providers/app_service_provider
 * @param {Dizzy} DIContainerConstructor - конструктор di-контейнера.
 * @return {Dizzy} новый объект Dizzy
 */
module.exports = (DIContainerConstructor) => {

  let container = new DIContainerConstructor();

  /** Встроенные модули и загружаемые зависимости. */
  container.registerBulk({
    'http': 'http',
    'moment': 'moment',
    'dotenv': 'dotenv',
    'winston': 'winston',
    'stampit': 'stampit',
    'amqpLib': 'amqplib',
    'mongoose': 'mongoose',
    'socketIO': 'socket.io',
    'useStrict': 'use-strict',
    'socketioJWT': 'socketio-jwt',
    'winstonFastRabbitMQ': 'winston-fast-rabbitmq',
  }).fromModule()
    .cached();

  /** Модули приложения */
  container.registerBulk({
    /** Конфигурационные модули. */
    'amqpConfig': `${__dirname}/../../config/amqp_config`,
    'dbConfig': `${__dirname}/../../config/database_config`,
    'loggerConfig': `${__dirname}/../../config/logger_config`,

    /** Модули ../amqp */
    'AMQPFacade': `${__dirname}/../amqp/facades/amqp_facade`,

    /** Ресурсные модули. */
    'validateMessages': `${__dirname}/../../resources/lang/ru/validate`
  }).fromModule()
    .cached();

  /** Модули приложения, выполняемые как фабрики. */
  container.registerBulk({
    /** Модули ../amqp */
    'amqp': `${__dirname}/../amqp/amqp`,
    'amqpChatItems': `${__dirname}/../amqp/amqp_chat_items`,
    'amqpConnection': `${__dirname}/../amqp/amqp_connection`,
    'chatFacade': `${__dirname}/../amqp/facades/chat_facade`,

    /** Модули ../core */
    'io': `${__dirname}/../core/io`,
    'app': `${__dirname}/../core/app`,
    'chat': `${__dirname}/../core/chat`,

    /** Модули ../database */
    'dbConnect': `${__dirname}/../database/db_connect`,
    'Message': `${__dirname}/../database/models/message`,

    /** Модули ../handlers */
    'amqpMessageHandler': `${__dirname}/../handlers/amqp_message_handler`,
    'socketEventHandler': `${__dirname}/../handlers/socket_event_handler`,

    /** Модули ../listeners */
    'socketEventListener': `${__dirname}/../listeners/socket_event_listener`,
    'chatHistoryQueueListener': `${__dirname}/../listeners/chat_history_queue_listener`,
    'relativeMessageQueueListener': `${__dirname}/../listeners/relative_message_queue_listener`,

    /** Модули ../middleware */
    'jwtAuthenticator': `${__dirname}/../middleware/jwt_authenticator`,
    'loggingMiddleware': `${__dirname}/../middleware/logging_middleware`,
    'chatHistoryMiddleware': `${__dirname}/../middleware/chat_history_middleware`,

    /** Модули ../system */
    'env': `${__dirname}/../system/env`,
    'handlerWrap': `${__dirname}/../system/handler_wrap`,
    'infoLogger': `${__dirname}/../system/loggers/info_logger`,
    'middlewareWrap': `${__dirname}/../system/middleware_wrap`,
    'errorLogger': `${__dirname}/../system/loggers/error_logger`,
    'connectErrorHandler': `${__dirname}/../system/connect_error_handler`,
    'errorLoggingHandler': `${__dirname}/../system/error_logging_handler`,
  }).fromModule()
    .asFactory()
    .cached();

  return container;
};
