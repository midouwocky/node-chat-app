var socket = io();

function scrollToBottom() {
    var messages = $("#messages");
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    var params = $.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/'
        } else {
            console.log('no err');

        }
    });
});
socket.on('disconnect', function () {
    console.log('disconnected from server');
});
socket.on('newMessage', function (message) {
    var messages = $("#messages");
    var template = $('#messageTemplate').html();
    var formatedTime = moment(message.createdAt).format('HH:mm');
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        time: formatedTime
    });
    messages.append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {

    var messages = $("#messages");
    var template = $('#locationTemplate').html();


    var formatedTime = moment(message.createdAt).format('HH:mm');
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        time: formatedTime
    });
    messages.append(html);
    scrollToBottom();
});
socket.on('updateUserList', function (users) {
    var ol = $('<ol></ol>');
    users.forEach(user => {
        ol.append($('<li></li>').text(user.name));
    });
    console.log(ol);

    $('#users').html(ol);
})

$('#message-from').on('submit', (e) => {
    e.preventDefault();
    var messageTextArea = $('[name=textInput]');
    var message = messageTextArea.val();
    socket.emit('sendMessage', { message }, function (message) {
        console.log(message);
        messageTextArea.val('');
    });
});
var locationButton = $('#locationButton');
locationButton.on('click', function () {

    if (!navigator.geolocation) {
        return alert('geolocation not supported on your browser');
    }
    locationButton.attr('disabled', true).text('sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.attr('disabled', false).text('send location');
        socket.emit('creatLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function () {
        locationButton.attr('disabled', false).text('send location');
        alert('unable to fatch location');
    })
});