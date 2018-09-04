import { COUNTDOWN_ACTIONS } from '../actions/countdownActions';

const challengedate = (state = '', action) => {
    switch (action.type) {
        case COUNTDOWN_ACTIONS.SET_COUNTDOWN:
            return action.payload || state;
        default:
            return state;
    }
}

export default challengedate;