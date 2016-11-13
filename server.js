'use strict';

let app = require('express')();
let server = require('http').createServer(app);

server.listen(3000, function () {
  console.log('Listenint on 3000');
});

let io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {
  console.log('client connected');

  let board;
  socket.on('join', function (data) {
    board = data.board;
    console.log(board);
    socket.join(board);
  });

  socket.on('client-emit', (params) => {
    console.log(params);
    console.log(board);
    io.sockets.in(board).emit('server-emit', params);
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});
