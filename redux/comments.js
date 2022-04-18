import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments: []}, action) => {

    console.log("PAYLOAD "+JSON.stringify(action.payload))
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_COMMENT:
            action.payload.id = state.comments.length;
            return {comments:[...state.comments, action.payload]};
        default:
            return state;
    }
};