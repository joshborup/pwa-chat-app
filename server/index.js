const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const lib = require('./lib/SocketFunctions');
const _ = require('lodash');

app.use(bodyParser.json());

app.use( express.static( `${__dirname}/../build` ) );

const myLib = new lib;

setInterval(() => {
    let newList = _.uniqBy(myLib.tempUserList, 'id')
    newList.sort(user => user.username)
    console.log(newList)
    myLib.users = newList
    myLib.tempUserList = [];
}, 4000);

io.sockets.on('connection', (socket) => {

    socket.on('join', (join) => {

        let joined = myLib.addUser(join, socket.id, myLib.users)
        socket.join(joined.room)
        io.in(joined.room).emit("joined", {room: joined.room, id: joined.id, username: joined.username, userList: joined.userList})
        io.to(socket.id).emit('user_id', joined.id);
        io.in(joined.room).emit('userlist', joined.userList);
    })

    socket.on('message', (message) => {
        if(message.message){
            myLib.sendMessage(message)
            io.in(message.room).emit('message', message)
        }
    })
    socket.on('userlist-cleanup', (user) => {

        io.in(user.room).emit('userlist', myLib.userListCleanup(myLib.users, user, myLib.tempUserList))

    })

    socket.on('left', (leave) => {
        let left = myLib.removeUser(leave, myLib.users);
        io.in(left.room).emit('userlist', left.userList)
        console.log(myLib.tempUserList)
    })

    socket.on('disconnect', (mySocket) => {
        console.log(mySocket)
        console.log('user disconnected');
    });
})

const path = require('path')
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 4001;
server.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));