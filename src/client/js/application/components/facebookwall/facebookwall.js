import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Post from './post';
import PostInput from './postinput';
import { POST } from '../../constants/typeconstants';

export default class FacebookWall extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        this.props.getPosts({}, POST);
    }

    render() {
        //let user = this.props.user;
        let user = {
            username: "denlillemand",
            image: '/denlillemand'
        };
        return(
            <div className="facebook-wall container">
                <PostInput createPost={this.props.createPost}  user={user} />
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




