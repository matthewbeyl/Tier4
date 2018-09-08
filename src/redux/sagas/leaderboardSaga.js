import { LEADERBOARD_ACTIONS } from '../actions/homeActions';
import { put, takeLatest } from 'redux-saga/effects';
import { leaderboard } from '../requests/homeRequests';

function* leaderboardSaga() {
    yield takeLatest(LEADERBOARD_ACTIONS.FETCH_LEADERS, fetchLeaders);
}

function* fetchLeaders() {
    try 
}