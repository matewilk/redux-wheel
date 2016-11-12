import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/App';
import { reducers } from './reducers/index';

import io from 'socket.io-client';
import socketIO, { sectorsMiddleware } from './middleware/socketio';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let sectors = [];
for (let i = 0; i < 5; i++) {
  sectors.push({
    count: 10,
    name: `${(i + 1) * 10}`,
    id: i,
    selected: false
  });
}
let modal = {
  open: false
};
let form = {
  value: ''
};
let spinning = {
  speed: 0,
  inMotion: false
}

const initial_state = { sectors, modal, form, spinning };
// create the store
const createStoreWithMiddleware = applyMiddleware(sectorsMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers, initial_state);

let socket = io('http://localhost:3000');
socketIO(store, socket);

// render the main component
ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/(:boardId)' socket={socket} component={App} />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
