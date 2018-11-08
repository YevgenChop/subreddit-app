import { combineReducers } from 'redux';
import {
    SELECT_SUBREDDIT,
    REQUEST_POSTS,
    RECEIVE_POSTS,
} from '../actions/actionTypes';

const requestedSubreddit = (state = 'sports', action) => {
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit;
        default:
            return state;
    }
};

const posts = (
    state = {
        isFetching: false,
        items: [],
    },
    action,
) => {
    switch (action.type) {
        case REQUEST_POSTS:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                items: action.posts,
                lastUpdated: action.receivedAt,
            };
        default:
            return state;
    }
};

const subredditPosts = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return {
                ...state,
                [action.subreddit]: posts(state[action.subreddit], action),
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    subredditPosts,
    requestedSubreddit,
});

export default rootReducer;
