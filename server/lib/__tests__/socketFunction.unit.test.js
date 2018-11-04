const Lib = require("../SocketFunctions");

describe("Unit Tests", function() {
	describe("Messaging", () => {
		it("Should add a timestamp to incoming message", (done) => {
			let message = {
				id: "j3jic03082jxXs2",
				room: "test",
				username: "Test_user",
				message: "This is a test"
			};

			let emptyMessage = {
				id: "j3jic03082jxXs2",
				room: "test",
				username: "Test_user",
				message: ""
			};
			expect(Lib.sendMessage(message)).toEqual({
				id: message.id,
				room: message.room,
				username: message.username,
				message: message.message,
				timestamp: expect.any(Date)
			});

			expect(Lib.sendMessage(emptyMessage)).toEqual(
				"no message included"
			);

			done();
		});
	});

	describe("User list", () => {
		it("it should send the userlist of the correct room", () => {
			const userList = [
				{
					room: "test1",
					username: "test_account_1",
					id: "sadfdfdsfasfa"
				},
				{
					room: "test1",
					username: "test_account_2",
					id: "jdj34fnuiajc9"
				},
				{
					room: "test1",
					username: "test_account_3",
					id: "sdafdf5bscDFG"
				},
				{
					room: "test2",
					username: "test_account_4",
					id: "GEHkjvier49nv"
				},
				{
					room: "test2",
					username: "test_account_5",
					id: "fkdp2rrbiaFbd"
				}
			];

			const checkingInUser = {
				room: "test1",
				username: "test_account_2",
				id: "jdj34fnuiajc9"
			};

			expect(Lib.userListCleanup(userList, checkingInUser)).toEqual([
				{
					room: "test1",
					username: "test_account_1",
					id: "sadfdfdsfasfa"
				},
				{
					room: "test1",
					username: "test_account_2",
					id: "jdj34fnuiajc9"
				},
				{
					room: "test1",
					username: "test_account_3",
					id: "sdafdf5bscDFG"
				}
			]);
			expect(
				Lib.userListCleanup(userList, checkingInUser)
			).not.toContainEqual({
				room: "test2",
				username: "test_account_4",
				id: "GEHkjvier49nv"
			});

			expect(
				Lib.userListCleanup(userList, checkingInUser)
			).not.toContainEqual({
				room: "test2",
				username: "test_account_5",
				id: "fkdp2rrbiaFbd"
			});
		});
	});
});
