const lib = require('./SocketFunctions');
const sinon = require('sinon');

describe("Unit Tests", () => {
    let myLib;
    beforeEach(() => {
        myLib = new lib;
        myLib.users = [];
    })

    describe("Adding and removing from userlist", () => {
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
            //expect the userlist to not be undefined
            expect(myLib.addUser(joinWithOutId).userList).toBeUndefined;
            //expect the userlist to have 1 item in the list after adding user
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
    
})



// describe("Unit Tests",()=> {
//     describe("userlist creation", () => {
//         it("should build correct user object to emit", () => {
//             const users = [];
//             let id = 0;
//             const join = {
//                 room: "cool",
//                 username: "joshborup",
//             }  
//             const socket = {
//                 join: (string)=> {
//                     return string
//                 }
//             }
//             const io = {
//                 in: () => {
//                     return {
//                         emit: sinon.mock().withArgs(sinon.match.string, sinon.match({
//                             room: sinon.match.string,
//                                 id: sinon.match.number,
//                                 username: sinon.match.string,
//                                 userList: sinon.match.array
//                             }))
//                         }
//                     }
//                 }
//             return socketFunctions.addUser(io, socket, join)
//         })
//         it("should remove user from list by id", () => {
//             const users = [{id: 0, room: "cool", username: "joshborup"}]

//             const socket = {
//                 leave: (string)=> {
//                     return string
//                 }
//             }
//             const left = {
//                 id:0,
//                 room: "cool",
//                 username: "joshborup"
//             }
//             const io = {
//                 in: () => {
//                     return {
//                         emit: sinon.mock().withArgs(sinon.match.string, sinon.match([]))
//                     }
//                 }
//             }
//             return socketFunctions.removeUser(io, socket, left, users)
//         })

//         it("add timestamp to each message", () => {
//             const message = {
//                 id: 0, 
//                 room: "cool", 
//                 username: "joshborup",
//                 message: "this is a test message"
//             }
            
//             const io = {
//                 in: () => {
//                     return {
//                         emit: sinon.mock().withArgs(sinon.match.string, sinon.match({
//                             id: message.id,
//                             room: message.room,
//                             username: message.username,
//                             message: message.message,
//                             timestamp: sinon.match.string
//                         }))
//                     }
//                 }
//             }
//             return socketFunctions.sendMessage(io, message)
//         })
//     })
// })