import React from 'react';

export default class Post extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        let user = this.props.user;
        let post = this.props.post;
        return(
            <div className="facebook-wall-post panel panel-default">
                <div className="panel-heading">{user.username}</div>
                <div className="panel-body">{post.description}</div>
                <div className="panel-footer"></div>
            </div>
        );

    }
}
Post.propTypes = {
    post: React.PropTypes.object,
    user: React.PropTypes.object
};
