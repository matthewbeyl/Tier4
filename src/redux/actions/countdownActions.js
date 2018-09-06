export const COUNTDOWN_ACTIONS = {
    SET_COUNTDOWN: 'SET_COUNTDOWN',
    FETCH_STARTDATE: 'FETCH_STARTDATE',
};

export function fetchStartDate() {
    return { type: COUNTDOWN_ACTIONS.FETCH_STARTDATE }
};