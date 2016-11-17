'use strict';

// http server
let app = require('express')();
let server = require('http').createServer(app);

server.listen(3000, function () {
  console.log('Listenint on 3000');
});

//app logic
let boards = {};

let addBoard = (boardId) => {
  if (!boards[boardId]) {
    boards[boardId] = { theta: 0};
  }
}

let addUserToBoard = (boardId, userId) => {
  if (!boards[boardId].users) {
    boards[boardId].users = [userId];
  } else {
    boards[boardId].users.push(userId);
  }
}

let removeUser = (userId) => {
  Object.keys(boards).forEach((board) => {
    let users = boards[board].users;
    users.forEach((user, index) => {
      users.splice(users.indexOf(userId), 1);
    });
  });
}

let setCurrentTheta = (boardId, theta) => {
  if (boards[boardId]) {
    boards[boardId].theta = theta;
  }
}

// socket events
let io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {
  console.log('client connected');
  console.log(`client id: ${socket.id}`);

  let board;
  socket.on('join', function (data) {
    // add board
    board = data.board;
    addBoard(board);
    addUserToBoard(board, socket.id);

    socket.join(board);

    io.sockets.in(board).emit('sync', boards[board].theta);
  });

  socket.on('client-emit', (params) => {
    console.log(params);
    console.log(boards);

    if (params.type === 'spinning.stop' && params.actionOwner) {
      setCurrentTheta(board, params.theta);
    }

    io.sockets.in(board).emit('server-emit', params);
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
    removeUser(socket.id);
    console.log(boards);
  });
});
