import { fromJS } from 'immutable';
import { loop, combineReducers } from 'redux-loop';
//import { routerReducer } from 'react-router-redux';
import menuDrawerReducer from '../modules/MenuDrawer/MenuDrawerState';
import { intlReducer } from 'react-intl-redux'

const reducers = {
  // Menu drawer state
  drawer: menuDrawerReducer,

  // Routing state
  //routing: routerReducer,

  // Internationalization state (TODO!)
  intl: intlReducer
}

const namespacedReducer = combineReducers(
  reducers
);

export default function rootReducer(state, action) {
  const [nextState, effects] = namespacedReducer(state, action);

  // enforce the state is immutable
  return loop(fromJS(nextState), effects);
}
