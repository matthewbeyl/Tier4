import { LEADERBOARD_ACTIONS } from '../actions/homeActions';
import { put, takeLatest } from 'redux-saga/effects';
import { getLeaders } from '../requests/homeRequests';

function* leaderboardSaga() {
    yield takeLatest(LEADERBOARD_ACTIONS.FETCH_LEADERS, fetchLeaders);
}

function* fetchLeaders() {
    try {
        const leaderboard = yield getLeaders();
        yield put({
            type: LEADERBOARD_ACTIONS.DISPLAY_LEADERS,
            payload: leaderboard
        });
    } catch (error) {
        console.log(error, 'error in fetch');
    }
}

export default leaderboardSaga;