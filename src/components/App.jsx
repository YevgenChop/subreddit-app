import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectSubreddit, fetchPostsIfNeeded } from '../store/actions';
import Header from './Header';
import Posts from './Posts';
import { withStyles } from '@material-ui/core/styles';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';

/**
 * @class App
 * @desc main component that gets state from the store and wraps the dumb components
 */

const propTypes = {
    requestedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

class App extends Component {
    /**
     * @method componentDidMount
     * @desc requests subreddit posts
     */
    componentDidMount() {
        const { dispatch, requestedSubreddit } = this.props;
        dispatch(fetchPostsIfNeeded(requestedSubreddit));
    };
    /**
     * @method handleChange
     * @desc gets selected subreddit and sends dispatch
     */
    handleChange = nextSubreddit => {
        const { dispatch } = this.props;
        dispatch(selectSubreddit(nextSubreddit));
        dispatch(fetchPostsIfNeeded(nextSubreddit));
    };

    render() {
        const { requestedSubreddit, posts, isFetching, classes } = this.props;

        return (
            <div className={classes.root}>
                <Header value={requestedSubreddit} onChange={this.handleChange} />
                {isFetching && posts.length === 0 && <h2>Loading...</h2>}
                {!isFetching && posts.length === 0 && <h2>Empty data</h2>}
                {posts.length > 0 && (
                    <div className={classes.content}>
                        <Posts posts={posts} />
                    </div>
                )}
                <Alert stack={{ limit: 3 }} />
            </div>
        );
    }
}

const styles = {
    root: {
        display: 'flex',
        width: '100%',
        height: '100%',
        minWidth: 400,
        flexDirection: 'column',
    },
    content: {
        overflowY: 'auto',
        height: '100%',
        padding: '70px 150px'
    }
};

App.protpTypes = propTypes;

/**
 * @function connect
 * @desc connects to App that the component has a state
 */
export default connect(state => {
    const { requestedSubreddit, subredditPosts } = state;
    const { isFetching, items: posts } = subredditPosts[requestedSubreddit] || {
        isFetching: true,
        items: [],
    };

    return {
        requestedSubreddit,
        posts,
        isFetching,
    };
})(withStyles(styles)(App));
