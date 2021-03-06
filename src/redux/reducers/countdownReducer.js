import { COUNTDOWN_ACTIONS } from '../actions/homeActions';

const challengeDate = (state = '', action) => {
    switch (action.type) {
        case COUNTDOWN_ACTIONS.SET_COUNTDOWN:
            return action.payload || state;
        default:
            return state;
    }
}

export default challengeDate;