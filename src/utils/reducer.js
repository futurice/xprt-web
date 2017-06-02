import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as drawer } from '../modules/NavigationDrawer';
import { reducer as intl } from './intl';
import { reducer as err } from '../modules/ErrorSnackbar';
import { reducer as registerModal } from '../modules/RegisterModal';
import { reducer as loginModal } from '../modules/LoginModal';
import { reducers as restReducers } from './rest';

const reducers = {
  // Navigation drawer state
  drawer,

  // Internationalization state
  intl,

  // Error snackbar component state
  err,

  // Redux form
  form: formReducer,

  // Router state
  router: routerReducer,

  // Register modal state
  registerModal,

  // Login modal state
  loginModal,

  // REST API endpoints' state
  ...restReducers,
};

const rootReducer = combineReducers(reducers);
export default rootReducer;
