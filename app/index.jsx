import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../public/styles/global.css';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-90673948-1');

import App from './components/App';
import { reducers } from './reducers/index';

import io from 'socket.io-client';
import socketIO, { sectorsMiddleware } from './middleware/socketio';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let sectors = [];
let modal = {
  open: false
};
let form = {
  value: '',
  link: ''
};
let spinning = {
  speed: 0,
  theta: 0,
  inMotion: false
};

let initGA = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

const initialState = { sectors, modal, form, spinning };
// create the store
const createStoreWithMiddleware = applyMiddleware(sectorsMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers, initialState);

let socket = io(`http://${window.location.hostname}:3000`);
socketIO(store, socket);

// render the main component
ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router onUpdate={initGA} history={browserHistory}>
        <Route path='/(:boardId)' socket={socket} component={App} />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
