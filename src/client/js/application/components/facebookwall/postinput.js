import React from 'react';
import { POST } from '../../constants/typeconstants';

export default class PostInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            description: ''
        };
        this.submitPost = this.submitPost.bind(this);
    }

    submitPost(event) {
        event.preventDefault();
        this.props.createPost({
            description: this.state.description
        }, POST);
        this.setState({
            description: ''
        });
    }

    render() {
        let user = this.props.user;
        return(
            <div className="facebook-wall-post-input panel-default">
                <div className="panel-heading">{/**{user.username}*/}</div>
                <div className="panel-body">
                    <label>description:</label>
                    <input onChange={(event) => { this.setState({description:event.target.value})}} placeholder="description" value={this.state.description} />
                    <button onClick={this.submitPost}>Opret rute</button>
                </div>
            </div>
        );
    }
}
PostInput.propTypes = {
    createPost: React.PropTypes.func,
    user: React.PropTypes.object
};
