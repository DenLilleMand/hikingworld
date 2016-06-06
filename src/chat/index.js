var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server, { serveClient:false });

server.listen(3001, () => {
    console.log('listening on port 3001')
});

io.on('connection',  (socket) => {
    socket.on('join', (data, err) => {
        console.log('Join data:', data, '. Err:', err);
        socket.to('/').emit('an event', { hello: 'world' });
    });

    socket.on('leave', (data, err) => {
        console.log('Leave data:', data, '. Err:', err);
    });
});





