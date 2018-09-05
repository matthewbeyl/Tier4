import { takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import { FEEDBACK_ACTION } from '../actions/feedbackActions';

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



// import { takeEvery, call } from 'redux-saga/effects';
// import axios from 'axios';
// import {ITEM_ACTION} from '../actions/addItemActions';

// function* addItemSaga() {    
//     try {
//         yield takeEvery(ITEM_ACTION.ADD_ITEM, addItem)
//     } catch (error) {
//         console.log(error);
        
//     }
// }

// function* addItem(action){
//     console.log(action);
    
//     try {

//         yield call(axios.post, '/api/shelf', action.payload)
//         yield alert('your item has been created')

//     } catch (error) {
//         console.log(error);
//     }
// }

// export default addItemSaga;