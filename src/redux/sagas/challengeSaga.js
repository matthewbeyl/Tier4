import { put as dispatch, takeLatest, call } from 'redux-saga/effects';
import { CHALLENGE_ACTIONS } from '../actions/challengeActions';
import axios from 'axios';

function* fetchPastChallenges() {
    try {
        const pastChallenges = yield call(axios.get, `/api/challenge/fetch-past`);
        console.log('########PAST CHALLENGES########: ', pastChallenges);
        yield dispatch({
            type: CHALLENGE_ACTIONS.SET_PAST_CHALLENGES,
            payload: pastChallenges.data
        })
    } catch (error) {
        console.log('error fetching past challenges: ', error);
    }
}

function* deleteUserFromCurrentChallenge(action) {
    try {
        yield call(axios.delete, `/api/challenge/delete-user-from-current-challenge/${action.payload}/${action.additionalPayload}`);
        yield dispatch({
            type: CHALLENGE_ACTIONS.FETCH_USER_DATA_CURRENT_CHALLENGE
        })
    } catch (error) {
        console.log('error deleting user from current challenge: ', error);
    }
}

function* deleteActiveChallenge() {
    try {
        yield call(axios.delete, `/api/challenge/delete-active`);
    } catch (error) {
        console.log('error deleting active challenge: ', error);
    }
}

function* fetchActiveChallenge() {
    try {
        const activeChallenge = yield call(axios.get, `/api/challenge/fetch-active`);
        yield dispatch({
            type: CHALLENGE_ACTIONS.SET_ACTIVE_CHALLENGE,
            payload: activeChallenge.data
        })
    } catch (error) {
        console.log('error fetching active challenge: ', error)
    }
}

function* fetchUserDataCurrentChallenge() {
    try {
        const currentChallenge = yield call(axios.get, `/api/challenge/user-data-current-challenge`);
        yield dispatch({
            type: CHALLENGE_ACTIONS.SET_USER_DATA_CURRENT_CHALLENGE,
            payload: currentChallenge.data
        })
    } catch (error) {
        console.log('error fetching user data for current challenge: ', error);
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
        yield call(axios.post, `/api/challenge/newChallenge`, action.payload)
    } catch (error) {
        console.log('error creating new challenge: ', error);
    }
}

function* challengeSaga() {
    yield takeLatest(CHALLENGE_ACTIONS.FETCH_USER_DATA_CURRENT_CHALLENGE, fetchUserDataCurrentChallenge);
    yield takeLatest(CHALLENGE_ACTIONS.CREATE_NEW_CHALLENGE, createNewChallenge);
    yield takeLatest(CHALLENGE_ACTIONS.CHECK_FOR_UPCOMING_CHALLENGE, checkForUpcomingChallenge);
    yield takeLatest(CHALLENGE_ACTIONS.CHECK_USER_IN_UPCOMING_CHALLENGE, checkUserInUpcomingChallenge);
    yield takeLatest(CHALLENGE_ACTIONS.FETCH_ACTIVE_CHALLENGE, fetchActiveChallenge);
    yield takeLatest(CHALLENGE_ACTIONS.DELETE_ACTIVE_CHALLENGE, deleteActiveChallenge);
    yield takeLatest(CHALLENGE_ACTIONS.DELETE_USER_FROM_CURRENT_CHALLENGE, deleteUserFromCurrentChallenge);
    yield takeLatest(CHALLENGE_ACTIONS.FETCH_PAST_CHALLENGES, fetchPastChallenges);
}

export default challengeSaga;
