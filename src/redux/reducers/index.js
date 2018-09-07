import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import challenge from './challengeReducer';
import challengeDate from './countdownReducer';

const store = combineReducers({
  user,
  login,
  challenge,
  challengeDate,
});

export default store;
