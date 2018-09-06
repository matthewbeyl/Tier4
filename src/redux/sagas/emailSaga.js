import { takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import { EMAIL_ACTION } from '../actions/dashboardActions';

function* addPreferencesSaga() {
    try {
        yield takeEvery(EMAIL_ACTION.ADD_PREFERENCES, addPreferences)
    } catch (error) {
        console.log('Error - ', error);        
    }
}

function* addPreferences(action){
    console.log(action);
    try{
        yield call(axios.post, '/api/email', action.payload)
        yield alert('Preferences Updated')
    } catch (error) {
        console.log('Error - ', error);
    }
}

export default addPreferencesSaga;