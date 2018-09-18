const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation')
const {Users} = require('./utils/users');

var app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('name and room name are required !');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit('updateUserList',users.getUsers(params.room));
        socket.emit('newMessage', generateMessage('admin', 'welcome to chat group'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage(params.name, 'has joined the room'));
        callback();
    });
    socket.on('disconnect', (socketDisconected) => {
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList',users.getUsers(user.room));
            io.to(user.room).emit('newMessage',generateMessage(user.name,'has left the room'));
        }
    });
    socket.on('sendMessage', (newMessage, callback) => {
        var user = users.getUser(socket.id);
        if(user&&isRealString(newMessage.message)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.message));
        }
        callback('this is from the server');
    });
    socket.on('creatLocationMessage', (coords) => {  
        var user = users.getUser(socket.id);      
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude,coords.longitude))
    });
});



server.listen(port, () => {
    console.log(`server started at port ${port}`);
});


