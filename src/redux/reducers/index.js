import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import challenge from './challengeReducer';
import challengedate from './countdownReducer';

const store = combineReducers({
  user,
  login,
  challenge,
  challengedate,
});

export default store;
