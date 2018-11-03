module.exports = {
	addToUserList(io, socket, userList, joiningUser) {
		socket.user = joiningUser;
		socket.user.id = socket.id;
		socket.join(joiningUser.room);
		userList.push(socket.user);

		let roomList = userList.filter((user) => {
			return user.room === joiningUser.room;
		});

		io.to(socket.id).emit("user_id", socket.id);

		io.in(joiningUser.room).emit("joined", {
			room: socket.user.room,
			id: socket.user.id,
			username: socket.user.username,
			userList: roomList
		});

		if (userList.includes(socket.user)) {
			return true;
		} else {
			return false;
		}
	},
	sendMessage(io, message) {
		if (message.message) {
			message.timestamp = new Date();
			io.in(message.room).emit("message", message);
		}
	},
	userListCleanup(io, userList, checkingInUser) {
		let roomList = userList.filter((user) => {
			return user.room === checkingInUser.room;
		});
		io.in(checkingInUser.room).emit("userlist", roomList);
	}
};
