const Lib = require("../SocketFunctions");
const io_client = require("socket.io-client");
const io_server = require("socket.io").listen(4001);

describe("basic socket.io example", function() {
	let socket;

	beforeEach(function(done) {
		// Setup

		socket = io_client.connect(
			"http://localhost:4001",
			{
				"reconnection delay": 0,
				"reopen delay": 0,
				"force new connection": true
			}
		);

		socket.on("connect", () => {
			done();
		});

		socket.on("disconnect", () => {
			// console.log('disconnected...');
		});
	});

	afterEach((done) => {
		// Cleanup
		if (socket.connected) {
			socket.disconnect();
		}
		io_server.close();
		done();
	});

	describe("Communicate correctly while adding a timestamp", () => {
		it("should add timestamp", (done) => {
			let message = {
				id: "2sdhSXF2345sheksmci",
				room: "test_room",
				username: "test username",
				message: "This is a test message"
			};

			io_server.emit("message", Lib.sendMessage(message));

			socket.once("message", (message) => {
				// Check that the message matches
				expect(message).toEqual({
					id: expect.any(String),
					room: expect.any(String),
					username: expect.any(String),
					message: expect.any(String),
					timestamp: expect.any(String)
				});

				done();
			});
			io_server.on("connection", (socket) => {
				expect(socket).toBeNull;
			});
		});
	});
});
