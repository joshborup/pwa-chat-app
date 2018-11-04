const express = require("express");
const app = express();
const server = require("http").createServer(app);
const Lib = require("./lib/SocketFunctions");
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const _ = require("lodash");

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../build`));

let userList = [];

io.sockets.on("connection", (socket) => {
	let addedToList = false;

	socket.on("join", (join) => {
		if (addedToList) return;
		addedToList = Lib.addToUserList(io, socket, userList, join);
	});

	socket.on("message", (message) => {
		io.in(message.room).emit("message", Lib.sendMessage(message));
	});

	socket.on("userlist-cleanup", (checkingInUser) => {
		io.in(checkingInUser.room).emit(
			"userlist",
			Lib.userListCleanup(userList, checkingInUser)
		);
	});

	socket.on("left", (leave) => {
		socket.leave(leave.room);
		userList = userList.filter((user) => {
			return user !== socket.user;
		});

		let roomList = userList.filter((user) => {
			return user.room === leave.room;
		});

		io.in(leave.room).emit("userlist", roomList);
		addedToList = false;
	});

	socket.on("disconnect", () => {
		// let user = socket.user ? socket.user : ""

		userList = userList.filter((user) => {
			if (user.id !== socket.id) {
				return user;
			}
		});
	});
});

const path = require("path");
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../build/index.html"));
});

const PORT = 4001;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
