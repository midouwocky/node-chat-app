var socket = io();
socket.on('connect', function () {
    console.log('connected to server');
});
socket.on('disconnect', function () {
    console.log('disconnected from server');
});
socket.on('newMessage', function (message) {

    var formatedTime = moment(message.createdAt).format('HH:mm');
    var messages = $("#messages");
    var li = $("<li></li>");
    li.text(`${message.from}, ${formatedTime} : ${message.text}`);
    messages.append(li);
    console.log(message);
});

socket.on('newLocationMessage', function (message) {
    
    var formatedTime = moment(message.createdAt).format('HH:mm');
    var messages = $("#messages");
    var li = $("<li></li>");
    var a = $('<a target="_blank">my current location</a>')
    li.text(`${message.from}, ${formatedTime} : `);
    a.attr('href',message.url);
    li.append(a);
    messages.append(li);
    console.log(message);
});
$('#message-from').on('submit',(e)=>{
    e.preventDefault();
    var messageTextArea=$('[name=textInput]');
    var message = messageTextArea.val();
    //var from = $('[name=fromInput]').val();
    var from ='midou';
    socket.emit('sendMessage', { from, message },function (message){
        console.log(message);
        messageTextArea.val('');
    }); 
});
var locationButton  = $('#locationButton');
locationButton.on('click',function(){
    
    if(!navigator.geolocation){
        return alert('geolocation not supported on your browser');
    }
    locationButton.attr('disabled',true).text('sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.attr('disabled',false).text('send location');
        socket.emit('creatLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
        
    },function () {
        locationButton.attr('disabled',false).text('send location');
        alert('unable to fatch location');
    })
});