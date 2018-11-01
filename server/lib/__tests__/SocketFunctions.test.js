const lib = require('../SocketFunctions');

// describe("Unit Tests", () => {
//     let myLib;

//     beforeEach(() => {
//         myLib = new lib;
//         myLib.users = [];
//     })

//     afterEach(() => {
//         myLib = new lib;
//         myLib.users = [];
//     })

//     describe("Adding to userlist", () => {
//         it("should add id to new user",()=> {
//             const joinWithOutId = {
//                 room: 'testing',
//                 username: 'josh'
//             }
//             expect(myLib.addUser(joinWithOutId))
//                 .toEqual(
//                     {
//                         username: 'josh',
//                         room: 'testing',
//                         id: 1,
//                         userList: [ { room: 'testing', id: 1, username: 'josh' } ]
//                     }
//             )
//             //expect the userlist to have 1 item in the list after adding user
//             expect(myLib.addUser(joinWithOutId).id).toEqual(expect.any(Number))
//             expect(myLib.addUser(joinWithOutId).userList.length).toEqual(1)
//         })

//         it("it should use the same id if reconnecting", () => {
//             const joinWithId = {
//                 room: 'testing',
//                 id: 5,
//                 username: 'josh'
//             }
//             expect(myLib.addUser(joinWithId))
//                 .toEqual(
//                     {
//                         username: 'josh',
//                         room: 'testing',
//                         id: 5,
//                         userList: [ { room: 'testing', id: 5, username: 'josh' } ]
//                     }
//             )
//         })

        
//     })

//     describe("UserList cleanups after disconnects",() => {

//         const checkingInUser = {
//             room: 'testing',
//             id: 5,
//             username: 'josh'
//         }

//         const myUserList = [{
//             room: 'testing',
//             id: 5,
//             username: 'josh'
//         }]

//         const emptyUserList = []

//         const ids = [1,2,3,4];
//         const duplicateIds = [1,2,3,4,5]
//         const duplicateTempIds = [1,2,3,4]
//         const tempIds = [5]
//         const NoIds = []

//         const emptyTempUserList = [];
//         const duplicateUserList = [{ room: 'testing', id: 1, username: 'test1' },{ room: 'testing', id: 5, username: 'josh' }]
//         const tempUserList = [{ room: 'testing', id: 5, username: 'josh' }]

//         it("should check to see if user is in list and an array with the user if in userlist, return empty list if not in userlist", ()=> {
//             expect(myLib.userListCleanup(myUserList, checkingInUser)).toEqual([ { room: 'testing', id: 5, username: 'josh' } ])
//             expect(myLib.userListCleanup(emptyUserList, checkingInUser)).toEqual([])
//         })

//         it("Should add list of users to userlist by id", () => {
//             expect(myLib.addLimboUsersToUserList(tempIds, ids, tempUserList)).toEqual([ { room: 'testing', id: 5, username: 'josh' } ])
//         })

//         it("Should not add to list if no user checks in", () => {
//             expect(myLib.addLimboUsersToUserList(NoIds, ids, emptyTempUserList)).toEqual([])
//         })

//         it("Should remove duplicate users", () => {
//             expect(myLib.removeDuplicateUsers(duplicateIds, duplicateTempIds, myUserList).length).toEqual(0)

            
//         })
//     })
//     describe("Removing from userlist", ()=> {
//         it("Should remove user from userlist",() => {
//             const joinWithOutId = {
//                 room: 'testing',
//                 username: 'josh'
//             }

//             const left = {
//                 room: 'testing',
//                 username: 'josh',
//                 id: 1
//             }

//             expect(myLib.addUser(joinWithOutId).userList.length).toEqual(1);
//             expect(myLib.removeUser(left).userList.length).toEqual(0);            
//         })
//     })

//     describe("Sending messages", () => {
//         it("should add a timestamp to incoming messages", () => {
//             let message = {
//                 id:1,
//                 room: 'test',
//                 username: 'joshborup',
//                 message: 'this message is a test'
//             }
//             expect(myLib.sendMessage(message).timestamp).toEqual(expect.any(Date))
//         })

//         it("should send the correct datatypes for id, room, username", () => {
//             let message = {
//                 id:1,
//                 room: 'test',
//                 username: 'joshborup',
//                 message: 'this message is a test'
//             }
//             expect(myLib.sendMessage(message)).toEqual({
//                 id:1,
//                 room: expect.any(String),
//                 username: expect.any(String),
//                 message: 'this message is a test',
//                 timestamp: expect.any(Date)
//             })
//         })
//     })
// });

// describe('Integration Tests', () => {
//     let myLib;

//     beforeEach(() => {
//         myLib = new lib;
//         myLib.users = [];
//     })

//     afterEach(() => {
//         myLib = new lib;
//         myLib.users = [];
//     })


//     describe("clean up timer", () => {
        
//         it("should remove both duplicates and add user that are checking in but not in list yet", () => {
//             const userList = [
//                 { room: 'test', id: 1, username: 'john' }, 
//                 { room: 'test', id: 2, username: 'jacob' }, 
//                 { room: 'test', id: 3, username: 'jingle' },
//                 { room: 'test', id: 4, username: 'heimer' },
//             ];
//             const tempUserList = [
//                 { room: 'test', id: 1, username: 'john' }, 
//                 { room: 'test', id: 2, username: 'jacob' }, 
//                 { room: 'test', id: 3, username: 'jingle' },
//                 { room: 'test', id: 5, username: 'schmidt' },
//             ];


//             return myLib.timedCleaner(userList, tempUserList).then(response => {
//                 console.log('asdfdfadsffdsa',response)
//             })
//         })
//     })
    
// })
