import { combineReducers } from 'redux';

import { reducer as drawer } from '../modules/NavigationDrawer';
import { reducer as err } from '../modules/ErrorSnackbar';
import { reducer as intl } from './intl';
import { reducers as restReducers } from './rest';
import { reducer as formReducer } from 'redux-form'

const reducers = {
  // Navigation drawer state
  drawer,

  // Internationalization state
  intl,

  // Error snackbar component state
  err,

  // Redux form
  form: formReducer,

  // REST API endpoints' state
  ...restReducers,
};

const rootReducer = combineReducers(reducers);
export default rootReducer;
