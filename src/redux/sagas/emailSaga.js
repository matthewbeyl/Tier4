import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { EMAIL_ACTION } from '../actions/dashboardActions';
import { USER_ACTIONS } from '../actions/userActions';
import swal from 'sweetalert';

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
        yield call(axios.post, '/api/dashboard/email', action.payload)
        yield put({
            type: USER_ACTIONS.FETCH_USER
        });
        yield swal('Preferences Updated')
    } catch (error) {
        console.log('Error - ', error);
    }
}

export default addPreferencesSaga;