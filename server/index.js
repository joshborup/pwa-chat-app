const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const lib = require('./lib/SocketFunctions');

app.use(bodyParser.json());

app.use( express.static( `${__dirname}/../build` ) );

const myLib = new lib;

io.sockets.on('connection', (socket) => {

    socket.on('join', (join) => {
        let joined = myLib.addUser(join)
        console.log(joined)
        socket.join(joined.room)
        io.in(joined.room).emit("joined", {room: joined.room, id: joined.id, username: joined.username, userList: joined.userList})
        console.log('after join',joined.userList);
        io.to(socket.id).emit('user_id', joined.id);
        io.in(joined.room).emit('userlist', joined.userList);
    })

    socket.on('message', (message) => {
        if(message.message){
            myLib.sendMessage(io, message)
        }
    })
    socket.on('userlist-cleanup', (user) => {
        
        io.in(user.room).emit('userlist', myLib.userListCleanup(user))
    })

    socket.on('left', (leave) => {
        let left = myLib.removeUser(leave);
        console.log('after left',left.userList);
        io.in(left.room).emit('userlist', left.userList)
        
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

const path = require('path')
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 4001;
server.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));