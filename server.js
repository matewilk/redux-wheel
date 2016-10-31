'use strict';

let app = require('express')();
let server = require('http').createServer(app);

server.listen(3000, function () {
  console.log('Listenint on 3000');
});

let io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {
  console.log('client connected');

  let room;
  socket.on('join', function (data) {
    room = data.room;
    console.log(room);
    socket.join(room);
  });

  socket.on('client-emit', (params) => {
    console.log(params);
    console.log(room);
    io.sockets.in(room).emit('server-emit', params);
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});
