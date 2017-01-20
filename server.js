'use strict';

let path = require('path');

// http server
let express = require('express');
let app = express();
let server = require('http').createServer(app);

// set static path
app.use(express.static('public'));
// enable html5 mode
app.all('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), () => {
  console.log('Listenint on 3000');
});

// app logic
let boards = {};

let addBoard = (boardId) => {
  if (!boards[boardId]) {
    let sectors = [
      { count: 10, id: 0, name: '10', selected: false },
      { count: 10, id: 1, name: '20', selected: false },
      { count: 10, id: 2, name: '30', selected: false },
      { count: 10, id: 3, name: '40', selected: false },
      { count: 10, id: 4, name: '50', selected: false }
    ];

    boards[boardId] = {
      theta: 0,
      sectors: sectors
    };
  }
};

let addUserToBoard = (boardId, userId) => {
  if (!boards[boardId].users) {
    boards[boardId].users = [userId];
  } else {
    boards[boardId].users.push(userId);
  }
};

let removeUser = (userId) => {
  Object.keys(boards).forEach((board) => {
    let users = boards[board].users;
    users.forEach((user, index) => {
      users.splice(users.indexOf(userId), 1);
    });
  });
};

let setCurrentTheta = (boardId, theta) => {
  if (boards[boardId]) {
    boards[boardId].theta = theta;
  }
};

// socket events
let io = require('socket.io')(server);
let serverReducer = require('./serverReducer');

io.sockets.on('connection', function (socket) {
  let board;
  socket.on('join', function (data) {
    // add board
    board = data.board;
    addBoard(board);
    addUserToBoard(board, socket.id);

    socket.join(board, () => {
      io.sockets.in(board).emit('sync', {
        theta: boards[board].theta,
        sectors: boards[board].sectors
      });
    });
  });

  socket.on('client-emit', (params) => {
    if (params.type === 'spinning.stop' && params.actionOwner) {
      setCurrentTheta(board, params.theta);
    }

    // save current board's sectors state
    boards[params.boardId].sectors = serverReducer(boards[params.boardId].sectors, params);

    io.sockets.in(board).emit('server-emit', params);
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
  });
});
