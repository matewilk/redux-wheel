import { combineReducers } from 'redux';

import sectors from './sectors';
import modal from './modal';
import form from './form';
import spinning from './spinning';

export const reducers = combineReducers({
  sectors,
  modal,
  form,
  spinning
});
