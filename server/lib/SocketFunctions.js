

module.exports = class {
    constructor(){
        this.users = [];
        this.id = 1;
    }

    addUser(join){
        this.users.push({room: join.room, id: this.id, username: join.username})
        let userList = this.users.filter((user)=>{
            return user.room == join.room
        })
        join.id = this.id
        join.userList = userList
        this.id ++;
        return join
    }

    removeUser(left){
        const myUsers = this.users.filter(user => {
            return user.id !== left.id
        })
        this.users = myUsers
        let userList = this.users.filter((user)=>{
            return user.room === left.room
        })
        left.userList = userList
        return left
    }
    sendMessage(io, message){
        message.timestamp = new Date().toLocaleTimeString();
        io.in(message.room).emit('message', message)
    }

    // testClear(){
    //     users = [];
    //     id = 0
    // }
}