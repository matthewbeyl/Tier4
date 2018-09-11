import { STATS_ACTIONS } from '../actions/dashboardActions';
import { put, takeLatest } from 'redux-saga/effects';
import { getUserStats } from '../requests/dashboardRequests';

function* statsSaga() {
    yield takeLatest(STATS_ACTIONS.FETCH_STATS, fetchStats);
}

function* fetchStats() {
    try{
        const userStats = yield getUserStats();
        yield put({
            type: STATS_ACTIONS.DISPLAY_STATS,
            payload: userStats
        });
    } catch (error) {
        console.log(error, 'error in fetch')
    }
}

export default statsSaga;