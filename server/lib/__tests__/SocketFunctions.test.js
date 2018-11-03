const Lib = require("../SocketFunctions");
const io = require("socket.io-client");
const io_server = require("socket.io").listen(4001);

describe("basic socket.io example", function() {
	var socket;

	beforeEach(function(done) {
		// Setup
		socket = io.connect(
			"http://localhost:4001",
			{
				"reconnection delay": 0,
				"reopen delay": 0,
				"force new connection": true,
				transports: ["websocket"]
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

	it("should communicate", (done) => {
		// const io = {
		// 	in: () => {
		// 		return {
		// 			emit: (string, obj)=> {

		// 			}
		// 		}
		// 	}
		// }

		// sendMessage(io, message) {
		// 	if (message.message) {
		// 		message.timestamp = new Date();
		// 		io.in(message.room).emit("message", message);
		// 	}
		// }
		// once connected, emit Hello World
		io_server.emit("echo", "Hello World");

		socket.once("echo", (message) => {
			// Check that the message matches
			expect(message).toEqual("Hello World");
			done();
		});

		io_server.on("connection", (socket) => {
			expect(socket).toBeNull;
		});
	});
});
