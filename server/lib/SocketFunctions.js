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
	sendMessage(message) {
		if (message.message || message.image) {
			message.timestamp = new Date();
			return message;
		} else {
			return "no message included";
		}
	},
	userListCleanup(userList, checkingInUser) {
		let roomList = userList.filter((user) => {
			return user.room === checkingInUser.room;
		});
		return roomList;
	}
};
