import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/App';
import { reducers } from './reducers/index';

import startIO, { sectorsMiddleware } from './middleware/sectors';

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
  speed: 0
}

const initial_state = { sectors, modal, form, spinning };
// create the store
const createStoreWithMiddleware = applyMiddleware(sectorsMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers, initial_state);

startIO(store);

// render the main component
ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
