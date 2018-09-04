import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import challengedate from './countdownReducer';

const store = combineReducers({
  user,
  login,
  challengedate,
});

export default store;
