import { combineReducers } from 'redux';
import { USER_ACTIONS } from '../actions/userActions';

const initialState = {
  active: '',
  admin: '',
  daily_email_reminders: '',
  email: '',
  github: '',
  id: '',
  image_url: '',
  name: '',
  queued_for_next_challenge: '',
  weekly_email_reminders: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case USER_ACTIONS.REQUEST_START:
      return true;
    case USER_ACTIONS.REQUEST_DONE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  user,
  isLoading,
});
