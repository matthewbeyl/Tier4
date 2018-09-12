import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import challenge from './challengeReducer';
import challengeDate from './countdownReducer';
import leaderboard from './leaderboardReducer';
import userStats from './statsReducer';

const store = combineReducers({
  user,
  login,
  challenge,
  challengeDate,
  leaderboard,
  userStats,
});

export default store;
