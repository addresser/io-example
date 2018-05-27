const faker = require('faker');
const socketIOClient = require('socket.io-client');

let clientSocket, message;

describe("socket message listener", () => {
  beforeAll((done) => {
    clientSocket = socketIOClient(`http://${process.env.APP_HOST}:${process.env.APP_PORT}/chat`);
    clientSocket.on('connect', (err) => {
      done();
    });
  });

  beforeAll(() => {
    message = faker.random.words();

    clientSocket.send(message);
  });

  afterAll(() => {
    clientSocket.close();
  });

  it("should send message to client", (done) => {
    clientSocket.on('message', (msg) => {
      expect(msg).toMatch(message);

      done();
    });
  });

  it("should call authentication middleware", () => {
    expect(container.resolve('jwtAuthenticator')).toHaveBeenCalled();
  });

  it("should log request and authenticated user", () => {
    expect(container.resolve('loggingMiddleware').login).toHaveBeenCalled();
  });
});
