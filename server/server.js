const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var server=http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected');
    
    socket.on('disconnect',(socket)=>{
        console.log('client disconnected');
    });
    socket.on('sendMessage',(newMessage)=>{
        console.log('the new message',newMessage);
        newMessage.createdAt = new Date().getTime();
        io.emit('newMessage',newMessage);
    });
});



server.listen(port, () => {
    console.log(`server started at port ${port}`);
});


