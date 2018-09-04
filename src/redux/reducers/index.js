import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import challenge from './challengeReducer';

const store = combineReducers({
  user,
  login,
  challenge,
});

export default store;
