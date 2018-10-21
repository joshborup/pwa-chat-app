const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use( express.static( `${__dirname}/../build` ) );

io.sockets.on('connection', (socket) => {
    console.log('user connected')

    socket.on('join', (join) => {
        console.log(join)
        socket.join(join.room)
        io.in(join.room).emit('joined', join)
        
    })

    socket.on('message', (message) => {
        console.log(message)
        io.in(message.room).emit('message', message)
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