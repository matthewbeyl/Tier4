import { combineReducers } from 'redux';
import { CHALLENGE_ACTIONS } from '../actions/challengeActions';

const current = (state = [], action) => {
  switch (action.type) {
    case CHALLENGE_ACTIONS.SET_USER_DATA_CURRENT_CHALLENGE:
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const past = (state = [], action) => {
  switch (action.type) {
    case CHALLENGE_ACTIONS.SET_PAST_CHALLENGES:
      return action.payload;
    default:
      return state;
  }
};

const upcoming = (state = [], action) => {
  switch (action.type) {
    case CHALLENGE_ACTIONS.SET_UPCOMING_CHALLENGE:
      return action.payload;
    default:
      return state;
  }
};

const userInUpcomingChallenge = (state = [], action) => {
  switch (action.type) {
    case CHALLENGE_ACTIONS.SET_USER_IN_UPCOMING_CHALLENGE:
      return action.payload;
    default:
      return state;
  }
}

const active = (state = [], action) => {
  switch (action.type) {
    case CHALLENGE_ACTIONS.SET_ACTIVE_CHALLENGE:
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  current,
  past,
  upcoming,
  userInUpcomingChallenge,
  active
});
