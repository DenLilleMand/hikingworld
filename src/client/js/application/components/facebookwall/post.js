import React from 'react';

export default class Post extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        let post = this.props.post;
        return(
            <div className="facebook-wall-post panel panel-default">
                <div className="panel-heading">{post.Account ? post.Account.username : "unknown user"}</div>
                <div className="panel-body">{post.description}</div>
                <div className="panel-footer">
                   <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                   <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                </div>
            </div>
        );

    }
}
Post.propTypes = {
    post: React.PropTypes.object
};
