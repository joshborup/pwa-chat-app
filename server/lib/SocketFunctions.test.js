const socketFunctions = require('./SocketFunctions');
const sinon = require('sinon');



describe("Unit Tests",()=> {
    describe("userlist creation", () => {
        it("should build correct user object to emit", () => {
            const users = [];
            let id = 0;
            const join = {
                room: "cool",
                username: "joshborup",
            }  
            const socket = {
                join: (string)=> {
                    return string
                }
            }
            const io = {
                in: () => {
                    return {
                        emit: sinon.mock().withArgs(sinon.match.string, sinon.match({
                            room: sinon.match.string,
                                id: sinon.match.number,
                                username: sinon.match.string,
                                userList: sinon.match.array
                            }))
                        }
                    }
                }
            return socketFunctions.addUser(io, socket, join, users, id)
        })
        it("should remove user from list by id", () => {
            const users = [{id: 0, room: "cool", username: "joshborup"}]

            const socket = {
                leave: (string)=> {
                    return string
                }
            }
            const left = {
                id:0,
                room: "cool",
                username: "joshborup"
            }
            const io = {
                in: () => {
                    return {
                        emit: sinon.mock().withArgs(sinon.match.string, sinon.match([]))
                    }
                }
            }
            return socketFunctions.removeUser(io, socket, left, users)
        })

        it("add timestamp to each message", () => {
            const message = {
                id: 0, 
                room: "cool", 
                username: "joshborup",
                message: "this is a test message"
            }
            
            const io = {
                in: () => {
                    return {
                        emit: sinon.mock().withArgs(sinon.match.string, sinon.match({
                            id: message.id,
                            room: message.room,
                            username: message.username,
                            message: message.message,
                            timestamp: sinon.match.string
                        }))
                    }
                }
            }
            return socketFunctions.sendMessage(io, message)
        })
    })
})