import { combineReducers } from 'redux-immutablejs';
import menuDrawerReducer from '../modules/MenuDrawer/MenuDrawerState';
import { restReducer } from '../services/rest';
import { intlReducer } from 'react-intl-redux'

const reducers = {
  // Menu drawer state
  drawer: menuDrawerReducer,

  // Routing state (TODO!)
  //routing: routerReducer,

  // REST API
  rest: restReducer,

  // Internationalization state (TODO!)
  intl: intlReducer
}

const namespacedReducer = combineReducers(
  reducers
);

export default function rootReducer(state, action) {
  return namespacedReducer(state, action);
}
