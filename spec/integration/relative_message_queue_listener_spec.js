const amqpChatItems = container.resolve('amqpChatItems');
const relativeMessageQueueListener = primalModules.relativeMessageQueueListener;

let message, channel, relativeMessageQueue, initAMQPChatItems;

describe("relative message queue listener", () => {
  beforeAll(async () => {
    await relativeMessageQueueListener();

    initAMQPChatItems = await amqpChatItems;
    channel = initAMQPChatItems.channel;
    relativeMessageQueue = initAMQPChatItems.relativeMessageQueue;

    spyOn(channel, 'ack').and.callThrough();
  });

  beforeAll(async () => {
    message = "chat message";

    await channel.sendToQueue(relativeMessageQueue.queue, new Buffer(message));
  });

  it("should confirm receiving message", async () => {
    expect(channel.ack).toHaveBeenCalled();
  })
});
