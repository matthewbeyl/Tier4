import { put as dispatch, takeLatest, call } from 'redux-saga/effects';
import { CHALLENGE_ACTIONS } from '../actions/challengeActions';
import axios from 'axios';

function* deleteActiveChallenge() {
    try {
        yield call(axios.delete, '/api/challenge/delete-active');
    } catch (error) {
        console.log('error deleting active challenge: ', error);
    }
}

function* fetchActiveChallenge() {
    try {
        const activeChallenge = yield call(axios.get, '/api/challenge/fetch-active');
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
    yield takeLatest(CHALLENGE_ACTIONS.FETCH_ACTIVE_CHALLENGE, fetchActiveChallenge);
    yield takeLatest(CHALLENGE_ACTIONS.DELETE_ACTIVE_CHALLENGE, deleteActiveChallenge);
}

export default challengeSaga;
