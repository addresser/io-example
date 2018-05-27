module.exports = (AMQPFacade, amqpChatItems, chatHistoryQueueListener, relativeMessageQueueListener) => {

  class ChatFacade extends AMQPFacade {
    constructor(
      amqpItems,
      chatHistoryQueueListener,
      relativeMessageQueueListener
    ) {
      super(amqpItems);

      this.chatHistoryQueueListener = chatHistoryQueueListener;
      this.relativeMessageQueueListener = relativeMessageQueueListener;
    }

    async sendMessage(message) {
      await this._initialize();

      this._amqpItems.channel.publish('chat', '', message);
    }

    async _initialize() {
      if(this._amqpItems.initialized) {
        return;
      }

      this._amqpItems = await this._amqpItems;

      await this.chatHistoryQueueListener();
      await this.relativeMessageQueueListener();

      this._amqpItems.initialized = true;
    }
  }

  return  new ChatFacade(
    amqpChatItems,
    chatHistoryQueueListener,
    relativeMessageQueueListener
  );
};