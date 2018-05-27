const Message = container.resolve('Message');
const dbConnect = container.resolve('dbConnect');
const chatHistoryMiddleware = primalModules.chatHistoryMiddleware;

let message, nextMock, socketMock;

describe("chat history middleware", () => {

  beforeAll(async () => {
    await dbConnect.connection;
    await dbConnect.connection.dropDatabase();

    let messageData = await dataGenerators.message.build();
    message = new Message(messageData.message.shift());
    await message.save();

    nextMock = jasmine.createSpy('nextMock');
    socketMock = jasmine.createSpyObj('socketMock', ['send']);
    spyOn(Message, 'find').and.callThrough();
  });

  beforeAll(async () => {
    await chatHistoryMiddleware(socketMock, nextMock);
  });

  afterAll(async () => {
    await dbConnect.connection.db.dropDatabase();
  });

  it("should send history message", async () => {
    expect(socketMock.send).toHaveBeenCalledWith(message.content);
  });

  it("should call next function", async () => {
    expect(Message.find).toHaveBeenCalled();
  });
});
