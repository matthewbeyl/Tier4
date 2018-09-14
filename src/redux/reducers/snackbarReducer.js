import { STATS_ACTIONS } from '../actions/dashboardActions';
import { combineReducers } from 'redux';

const emailSnackbar = (state = false, action) => {
    switch (action.type) {
        case 'OPEN_EMAIL_SNACKBAR':
            return true;
        case 'CLOSE_EMAIL_SNACKBAR':
            return false;
        default:
            return state;
    }
}

const feedbackSnackbar = (state = false, action) => {
    switch (action.type) {
        case 'OPEN_FEEDBACK_SNACKBAR':
            return true;
        case 'CLOSE_FEEDBACK_SNACKBAR':
            return false;
        default:
            return state;
    }
}

export default combineReducers({
    emailSnackbar,
    feedbackSnackbar,
  });