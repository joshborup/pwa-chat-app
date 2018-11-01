const _ = require('lodash');

module.exports = class {
    constructor(){
        this.users = [];
        this.tempUserList = []
        this.cleaner = setInterval(() => {

            let newList = _.uniqBy(this.tempUserList, 'id')
            newList.sort(user => user.username)

            this.users = newList
            this.tempUserList = [];
        }, 4000);   
        this.addUser = this.addUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    addUser(join, socketId, myUserList){
        if(join.id){
            myUserList = myUserList.filter(( user ) => {
                return user.id !== join.id;
            })
            myUserList.push({room: join.room, id: join.id, username: join.username})
            let userList = myUserList.filter(( user ) => {
                return user.room == join.room
            }) 
            join.userList = userList
            return join
            
        } else {
            myUserList.push({room: join.room, id: socketId, username: join.username})
            let userList = myUserList.filter((user)=>{
                return user.room == join.room
            })
            join.id = socketId 
            join.userList = userList
            return join
        }
    }
    userListCleanup(myUserList, checkingInUser, tempUserList){
        tempUserList.push(checkingInUser);
        return myUserList
    }
    removeUser(left, myUserList){
        myUserList = myUserList.filter(user => {
            return user.id !== left.id
        })
        
        let userList = myUserList.filter((user)=>{
            return user.room === left.room
        })
        left.userList = userList;
        return left
    }
    sendMessage(message){
        message.timestamp = new Date();
        return message
    }
}