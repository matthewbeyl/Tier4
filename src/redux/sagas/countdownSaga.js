import { COUNTDOWN_ACTIONS } from '../actions/homeActions';
import { put, takeLatest } from 'redux-saga/effects';
import { getChallengeDate } from '../requests/homeRequests';

function* countdownSaga() {
    yield takeLatest(COUNTDOWN_ACTIONS.FETCH_STARTDATE, fetchStartDate);
}

function* fetchStartDate() {
    try {
        const challengedate = yield getChallengeDate();
        yield put({
            type: COUNTDOWN_ACTIONS.SET_COUNTDOWN,
            payload: challengedate
        });       
    } catch (error) {
        console.log(error, 'error in fetch')
    }
}

export default countdownSaga;