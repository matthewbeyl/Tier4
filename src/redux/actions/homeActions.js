export const COUNTDOWN_ACTIONS = {
    SET_COUNTDOWN: 'SET_COUNTDOWN',
    FETCH_STARTDATE: 'FETCH_STARTDATE',
};

export const LEADERBOARD_ACTIONS = {
    FETCH_LEADERS: 'FETCH_LEADERS',
    DISPLAY_LEADERS: 'DISPLAY_LEADERS',
}

export function fetchStartDate() {
    return { type: COUNTDOWN_ACTIONS.FETCH_STARTDATE }
};

export function fetchLeaders() {
    return { type: LEADERBOARD_ACTIONS.FETCH_LEADERS }
};