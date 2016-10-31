import io from 'socket.io-client';

var socket = null;

export function sectorsMiddleware (store) {
  return (next) => (action) => {
    let result = next(action);

    if (socket && action.type === 'sectors.addSector') {
      let actionParams = action;
      socket.emit('client-emit', actionParams);
    }

    return result;
  };
}

export default function (store) {
  socket = io('http://localhost:3000');
  socket.emit('join', {room: 'abc'});

  socket.on('server-emit', actionParams => {
    store.dispatch({
      type: 'sectors.addSectorLocal',
      value: actionParams.value,
      sectors: actionParams.sectors
    });
  });
}
