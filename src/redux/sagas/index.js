import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import countdownSaga from './countdownSaga';
import addFeedbackSaga from './feedbackSaga';
import addPreferencesSaga from './emailSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    countdownSaga(),
    addFeedbackSaga(),
    addPreferencesSaga(),
    // watchIncrementAsync()
  ]);
}
