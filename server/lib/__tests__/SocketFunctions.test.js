const lib = require('../SocketFunctions');

describe("Unit Tests", () => {
    let myLib;

    beforeEach(() => {
        myLib = new lib;
        myLib.users = [];
    })

    afterEach(() => {
        myLib = new lib;
        myLib.users = [];
    })

    describe("Adding to userlist", () => {
        it("should add id to new user",()=> {
            const joinWithOutId = {
                room: 'testing',
                username: 'josh'
            }
            expect(myLib.addUser(joinWithOutId))
                .toEqual(
                    {
                        username: 'josh',
                        room: 'testing',
                        id: 1,
                        userList: [ { room: 'testing', id: 1, username: 'josh' } ]
                    }
            )
            //expect the userlist to have 1 item in the list after adding user
            expect(myLib.addUser(joinWithOutId).id).toEqual(expect.any(Number))
            expect(myLib.addUser(joinWithOutId).userList.length).toEqual(1)
        })

        it("it should use the same id if reconnecting", () => {
            const joinWithId = {
                room: 'testing',
                id: 5,
                username: 'josh'
            }
            expect(myLib.addUser(joinWithId))
                .toEqual(
                    {
                        username: 'josh',
                        room: 'testing',
                        id: 5,
                        userList: [ { room: 'testing', id: 5, username: 'josh' } ]
                    }
            )
        })
    })

    describe("Removing from userlist", ()=> {
        it("Should remove user from userlist",() => {
            const joinWithOutId = {
                room: 'testing',
                username: 'josh'
            }

            const left = {
                room: 'testing',
                username: 'josh',
                id: 1
            }

            expect(myLib.addUser(joinWithOutId).userList.length).toEqual(1);
            expect(myLib.removeUser(left).userList.length).toEqual(0);            
        })
    })

    describe("Sending messages", () => {
        it("should add a timestamp to incoming messages", () => {
            let message = {
                id:1,
                room: 'test',
                username: 'joshborup',
                message: 'this message is a test'
            }
            expect(myLib.sendMessage(message).timestamp).toEqual(expect.any(Date))
        })
    })
});