import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Post from './post';
import PostInput from './postinput';
import postActionCreators from '../../actioncreators/postactioncreators';
import { bindActionCreators } from 'redux';

class FacebookWall extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        //let user = this.props.user;
        let dispatch = this.props.dispatch;
        let user = {
            username: "denlillemand",
            image: '/denlillemand'
        };

        let boundPostActionCreators = bindActionCreators(postActionCreators, dispatch);
        return(
            <div className="facebook-wall">
                <PostInput createPost={boundPostActionCreators.asyncCreatePost} user={user} />
                {this.props.posts.map((post) => {
                    return (<Post user={user} post={post} />);
                })}
            </div>
        );
    }
}
FacebookWall.propTypes = {
    posts: React.PropTypes.array

};


function getState(state) {
    return {
        user:state.users.user,
        users: state.users.users,
        posts: state.posts.posts
    };
}

export default connect(getState)(FacebookWall);

