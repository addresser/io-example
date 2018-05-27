const delay = require('delay');
const Message = container.resolve('Message');
const dbConnect = container.resolve('dbConnect');
const amqpChatItems = container.resolve('amqpChatItems');
const chatHistoryQueueListener = primalModules.chatHistoryQueueListener;

let message, initAMQPChatItems, chatHistoryQueue, channel;

describe("chat history queue listener", () => {
  beforeAll(async () => {
    await dbConnect.connection;
    await dbConnect.connection.dropDatabase();

    await chatHistoryQueueListener();

    initAMQPChatItems = await amqpChatItems;
    channel = initAMQPChatItems.channel;
    chatHistoryQueue = initAMQPChatItems.chatHistoryQueue;

    spyOn(channel, 'ack').and.callThrough();
  });

  beforeAll(async () => {
    message = 'chat message';

    await channel.sendToQueue(chatHistoryQueue.queue, new Buffer(message));

    await delay(100);
  });

  afterAll(async () => {
    await dbConnect.connection.dropDatabase();
  });

  it("should create new message document in database", async () => {
    let newDoc = await Message.findOne({
      content: message
    });

    expect(newDoc).toEqual(jasmine.objectContaining({ content: message }));
  });

  it("should confirm receiving message", async () => {
    expect(channel.ack).toHaveBeenCalled();
  });
});
