var socket = io();
socket.on('connect', function () {
    console.log('connected to server');
});
socket.on('disconnect', function () {
    console.log('disconnected from server');
});
socket.on('newMessage', function (message) {
    var messages = document.getElementById("messages");
    console.log(message);

    messages.value = messages.value + `\nfrom : ${message.from}\nmessage : ${message.message}\nAt : ${message.createdAt}`;
});

var send = () => {
    var textInput = document.getElementById("textInput");
    var fromInput = document.getElementById("fromInput");
    var message = textInput.value;
    var from = fromInput.value;

    socket.emit('sendMessage', { from, message });
    textInput.value='';

}