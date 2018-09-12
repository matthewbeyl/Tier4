import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import challengeSaga from './challengeSaga';
import countdownSaga from './countdownSaga';
import addFeedbackSaga from './feedbackSaga';
import addPreferencesSaga from './emailSaga';
import statsSaga from './statsSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    statsSaga(),
    loginSaga(),
    challengeSaga(),
    countdownSaga(),
    addFeedbackSaga(),
    addPreferencesSaga(),
    // watchIncrementAsync()
  ]);
}
