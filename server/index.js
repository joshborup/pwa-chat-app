const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use( express.static( `${__dirname}/../build` ) );

let users = [];
let id = 0;

io.sockets.on('connection', (socket) => {
    console.log('user connected')

    socket.on('join', (join) => {

        users.push({room: join.room, id: id, username: join.username})
        socket.join(join.room)
        let userList = users.filter((user)=>{
            return user.room == join.room
        })
        io.in(join.room).emit('joined', {room: join.room, id: id, username: join.username, userList: userList})
        id++
    })

    socket.on('message', (message) => {
        console.log(message)
        io.in(message.room).emit('message', message)
    })

    socket.on('left', (left) => {
        const myUsers = users.filter(user => {
            return user.id !== left.id
        })
        console.log('myusers', myUsers)
        users = myUsers;

        let userList = myUsers.filter((user)=>{
            return user.room === left.room
        })
        console.log('left the room', userList)
        
        io.in(left.room).emit('userlist', userList)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

const path = require('path')
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 4000;
server.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));