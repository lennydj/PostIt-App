import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import signuserin from './signinReducer';
import session from './sessionReducer';

const rootReducer = combineReducers({
  signuserin,
  session,
  toastr: toastrReducer
});

export default rootReducer;
