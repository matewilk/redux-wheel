import io from 'socket.io-client';

var socket = null;

export function sectorsMiddleware (store) {
  return (next) => (action) => {
    let result = next(action);

    let inMotion = store.getState().spinning.inMotion;
    let boardId = store.getState().form.boardId;
    action.boardId = boardId;

    //block sending io events if the wheel is in motion
    if (!inMotion) {
      // sectors events
      if (socket && action.type.match(/^((?=sectors))((?!Local).)*$/)) {
        let actionParams = action;

        if (action.type === 'sectors.addSector') {
          action.id = (Math.random() * (9999 - 10) + 10);
        }

        socket.emit('client-emit', actionParams);
      }

      // spin button spinning events
      if (socket && action.type.match(/^((?=spinning))((?!Local).)*$/)) {
        let actionParams = action;

        if (action.type === 'spinning.spin') {
          action.speed = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
          action.owner = action.owner ? true : false;
        }

        socket.emit('client-emit', actionParams);
      }
    }

    return result;
  };
}

export default function (store, socketio) {
  socket = socketio;

  socket.on('server-emit', actionParams => {
    let type, params;
    let test = { type, ...params } = actionParams;
    test.type = `${type}Local`
    store.dispatch(test);
  });
}
