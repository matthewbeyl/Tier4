export const FEEDBACK_ACTION = {
    ADD_FEEDBACK : 'ADD_FEEDBACK'
}

export const addFeedback = (payload) => ({
    type : FEEDBACK_ACTION.ADD_FEEDBACK,
    payload : payload
})

export const EMAIL_ACTION = {
    ADD_PREFERENCES : 'ADD_PREFERENCES'
}

export const addPreferences = (payload) => ({
    type : EMAIL_ACTION.ADD_PREFERENCES,
    payload : payload
})