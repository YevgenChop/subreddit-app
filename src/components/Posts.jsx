import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMediaCustom from './CardMediaCustom';

const noImageLink = 'https://blog.stylingandroid.com/wp-content/themes/lontano-pro/images/no-image-slide.png';
/**
 * @class Posts
 * @desc dumb component that gets props and displays posts
 */

const propTypes = {
    posts: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
};

class Posts extends PureComponent {
    chooseCorrectPreview({ preview }) {
        return (preview &&
            preview.images &&
            preview.images[0] &&
            ((preview.images[0].variants.gif &&
                preview.images[0].variants.gif.source.url) ||
                preview.images[0].source.url)) ||
            noImageLink;
    }

    render() {
        const { posts, classes } = this.props;

        return posts.map((post, i) => {
            return (
                <div className={classes.wrapper} key={i}>
                    <a href={post.url} className={classes.link}>
                        <Card className={classes.card}>
                            <Typography variant="title" className={classes.title}>
                                {post.title}
                            </Typography>
                            <CardMediaCustom
                                className={classes.media}
                                image={this.chooseCorrectPreview(post)}
                            />
                        </Card>
                    </a>
                </div>
            );
        });
    }
}

const styles = {
    wrapper: {
        width: '50%',
        display: 'inline-block',
    },
    link: {
        textDecoration: 'none',
    },
    card: {
        margin: 10,
    },
    title: {
        fontSize: 18,
        padding: 15,
    },
    media: {
        height: 500,
        width: '100%',
    },
};

Posts.protoTypes = propTypes;

export default withStyles(styles)(Posts);
