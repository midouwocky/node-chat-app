const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');

var app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');
    socket.emit('newMessage', generateMessage('admin', 'welcome to chat group'));
    socket.broadcast.emit('newMessage', generateMessage('admin', 'new user connected'));

    socket.on('disconnect', (socket) => {
        console.log('client disconnected');
    });
    socket.on('sendMessage', (newMessage, callback) => {
        socket.broadcast.emit('newMessage', generateMessage(newMessage.from, newMessage.message));
        callback('this is from the server');
    });
    socket.on('creatLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });
});



server.listen(port, () => {
    console.log(`server started at port ${port}`);
});


