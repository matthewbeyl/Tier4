import { LEADERBOARD_ACTIONS } from '../actions/homeActions';

const leaderboard = (state= [], action) => {
    switch (action.type) {
        case LEADERBOARD_ACTIONS.DISPLAY_LEADERS:
            return action.payload || state;
        default:
            return state;
    }
}

export default leaderboard;