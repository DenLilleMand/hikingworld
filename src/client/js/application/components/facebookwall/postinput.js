import React from 'react';

export default class PostInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            description: ''
        };
    }

    render() {
        let user = this.props.user;
        return(
            <div className="facebook-wall-post-input panel-default">
                Hello world!!
                <div className="panel-heading">{user.username}</div>
                <div className="panel-body">
                    <label>description:</label>
                    <input onChange={(event) => { this.setState(event.target.value)}} placeholder="description" value={this.state.description} />
                    <button onClick={(event) => this.props.createPost(this.state.description, this.props.user) }>Submit</button>
                </div>
            </div>
        );

    }
}
PostInput.propTypes = {
    user: React.PropTypes.object,
    createPost: React.PropTypes.func
};
