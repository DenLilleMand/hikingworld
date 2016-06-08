import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Post from './post';
import PostInput from './postinput';
import { POST } from '../../constants/typeconstants';
import Moment from 'moment';

export default class FacebookWall extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            posts: [],
            io: null
        };
    }

    componentDidMount() {
        this.props.getPosts({}, POST);
        //this.props.getUser(session.key);
    }

    componentWillReceiveProps(props) {
        this.setState({
            posts: props.posts.slice().map((post) => {
                post.createdAtDate = new Date(post.createdAt);
                post.updatedAtDate = new Date(post.updatedAt);
                return post;
            })
        });
    }

    render() {

        let sortedPosts = this.state.posts.sort((a, b ) => {
            return b.createdAtDate - a.createdAtDate;
        });

        return(
            <div className="facebook-wall container">
                <PostInput /**user={}*/ createPost={this.props.createPost} />
                {sortedPosts.map((post) => {
                    return (<Post post={post} />);
                })}
            </div>
        );
    }
}
FacebookWall.propTypes = {
    posts: React.PropTypes.array
};




