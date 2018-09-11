import { put as dispatch, takeLatest, call } from 'redux-saga/effects';
import { CHALLENGE_ACTIONS } from '../actions/challengeActions';
import axios from 'axios';

function* fetchActiveChallenge() {
    console.log('rawr');
    try {
        const activeChallenge = yield call(axios.get, '/api/challenge/active');
        console.log('hvyf6',activeChallenge);
        yield dispatch({
            type: CHALLENGE_ACTIONS.SET_ACTIVE_CHALLENGE,
            payload: activeChallenge.data
        })
    } catch (error) {
        console.log('error fetching active challenge: ', error)
    }
}

function* fetchCurrentChallenge() {
    try {
        const currentChallenge = yield call(axios.get, '/api/challenge/currentChallenge');
        console.log(currentChallenge);
        yield dispatch({
            type: CHALLENGE_ACTIONS.SET_CURRENT_CHALLENGE,
            payload: currentChallenge.data
        })
    } catch (error) {
        console.log('error fetching current challenge: ', error);
    }
}

function* createNewChallenge(action) {
    try {
        yield call(axios.post, '/api/challenge/newChallenge', action.payload)
    } catch (error) {
        console.log('error creating new challenge: ', error);
    }
}

function* challengeSaga() {
    yield takeLatest(CHALLENGE_ACTIONS.FETCH_CURRENT_CHALLENGE, fetchCurrentChallenge);
    yield takeLatest(CHALLENGE_ACTIONS.CREATE_NEW_CHALLENGE, createNewChallenge);
    yield takeLatest(CHALLENGE_ACTIONS.FETCH_ACTIVE_CHALLENGE, fetchActiveChallenge)
}

export default challengeSaga;
