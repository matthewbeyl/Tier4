import { STATS_ACTIONS } from '../actions/dashboardActions';

const userStats = (state = '', action) => {
    switch (action.type) {
        case STATS_ACTIONS.DISPLAY_STATS:
            return action.payload || state;
        default:
            return state;
    }
}

export default userStats