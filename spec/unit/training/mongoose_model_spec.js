const Message = container.resolve('Message');
const dbConnect = container.resolve('dbConnect');

let message;
describe("mogoose model", () => {
  beforeAll(async () => {
    await dbConnect.connection;
    await dbConnect.connection.dropDatabase();

    let messageData = await dataGenerators.message.build();
    message = new Message(messageData.message.shift());
  });

  afterAll(async () => {
    await dbConnect.connection.db.dropDatabase();
  });

  it("should create new document", async () => {
    await message.save();

    let newDoc = await Message.findOne({ _id: message._id });

    expect(newDoc).toEqual(jasmine.objectContaining({ content: message.content }));
  });
});
