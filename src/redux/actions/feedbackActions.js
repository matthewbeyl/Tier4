export const FEEDBACK_ACTION = {
    ADD_FEEDBACK : 'ADD_FEEDBACK'
}

export const addFeedback = (payload) => ({
    type : FEEDBACK_ACTION.ADD_FEEDBACK,
    payload : payload
})