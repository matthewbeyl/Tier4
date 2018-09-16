import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { FEEDBACK_ACTION } from '../actions/dashboardActions';

function* addFeedbackSaga() {
    try {
        yield takeEvery(FEEDBACK_ACTION.ADD_FEEDBACK, addFeedback)
    } catch (error) {
        console.log('Error - ', error);        
    }
}

function* addFeedback(action){
    console.log(action);
    try{
        yield call(axios.post, '/api/dashboard/feedback', action.payload)
        yield put({
            type: 'OPEN_FEEDBACK_SNACKBAR'
        });
    } catch (error) {
        console.log('Error - ', error);
    }
}

export default addFeedbackSaga;
