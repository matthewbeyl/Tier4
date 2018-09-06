import { takeEvery, call } from 'redux-saga/effects';
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
        yield call(axios.post, '/api/feedback', action.payload)
        yield alert('Feedback Submitted')
    } catch (error) {
        console.log('Error - ', error);
    }
}

export default addFeedbackSaga;
