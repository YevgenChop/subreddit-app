import fetch from 'cross-fetch';
import Alert from 'react-s-alert';

import {
    REQUEST_POSTS,
    RECEIVE_POSTS,
    SELECT_SUBREDDIT,
} from './actionTypes';

/**
 * @function requestPosts
 * @desc action for try getting posts
 */
const requestPosts = subreddit => {
    return {
        type: REQUEST_POSTS,
        subreddit,
    };
};

/**
 * @function receivePosts
 * @desc action for receive posts
 */
const receivePosts = (subreddit, json) => {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
    };
};

/**
 * @function fetchPosts
 * @desc action for loading data, if the error - shows an Alert with the error text
 */
const fetchPosts = subreddit => {
    return dispatch => {
        dispatch(requestPosts(subreddit));
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then(res => res.json())
            .then(json => dispatch(receivePosts(subreddit, json)))
            .catch(err =>
                Alert.error(err.message, {
                    position: 'bottom-right',
                    effect: 'bouncyflip',
                    timeout: 4000,
                }),
            );
    };
};

/**
 * @function shouldFetchPosts
 * @desc checkout empty state
 */
const shouldFetchPosts = (state, subreddit) => {
    const posts = state.subredditPosts[subreddit];
    if (!posts) {
        return true;
    } else if (posts.isFetching) {
        return false;
    } else {
        return posts.didInvalidate;
    }
};

/**
 * @function selectSubreddit
 * @desc action on subreddit select
 */
export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit,
    };
}

/**
 * @function fetchPostsIfNeeded
 * @desc fetch posts if state is empty
 */
export function fetchPostsIfNeeded(subreddit) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
            return dispatch(fetchPosts(subreddit));
        }
    };
}
