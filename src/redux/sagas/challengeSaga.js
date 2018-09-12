import { put as dispatch, takeLatest, call } from 'redux-saga/effects';
import { CHALLENGE_ACTIONS } from '../actions/challengeActions';
import axios from 'axios';

function* fetchCurrent() {
    try {
        const currentChallenge = yield call(axios.get, '/api/challenge/pastChallenge');
        // console.log(currentChallenge);
        yield dispatch({
            type: CHALLENGE_ACTIONS.SET_CURRENT_CHALLENGE,
            payload: currentChallenge.data
        })
    } catch (error) {
        console.log('error fetching current challenge', error);
    }
}

function* checkForUpcomingChallenge() {
    try {
        const upcomingChallenge = yield call(axios.get, '/api/challenge/futureChallenge');
        // console.log(currentChallenge);
        yield dispatch({
            type: CHALLENGE_ACTIONS.SET_UPCOMING_CHALLENGE,
            payload: upcomingChallenge.data
        })
    } catch (error) {
        console.log('error checking for future challenge', error);
    }
}

function* checkUserInUpcomingChallenge() {
    try {
        const userInUpcomingChallenge = yield call(axios.get, '/api/challenge/futureChallenge/joined');
        // console.log(currentChallenge);
        yield dispatch({
            type: CHALLENGE_ACTIONS.SET_USER_IN_UPCOMING_CHALLENGE,
            payload: userInUpcomingChallenge.data
        })
    } catch (error) {
        console.log('error checking for future challenge', error);
    }
}

function* createNewChallenge(action) {
    try {
        yield call(axios.post, '/api/challenge/newChallenge', action.payload)
    } catch (error) {
        console.log('error creating new challenge', error);
    }
}

function* challengeSaga() {
    yield takeLatest(CHALLENGE_ACTIONS.FETCH_CURRENT_CHALLENGE, fetchCurrent);
    yield takeLatest(CHALLENGE_ACTIONS.CREATE_NEW_CHALLENGE, createNewChallenge);
    yield takeLatest(CHALLENGE_ACTIONS.CHECK_FOR_UPCOMING_CHALLENGE, checkForUpcomingChallenge);
    yield takeLatest(CHALLENGE_ACTIONS.CHECK_USER_IN_UPCOMING_CHALLENGE, checkUserInUpcomingChallenge);
}

export default challengeSaga;
