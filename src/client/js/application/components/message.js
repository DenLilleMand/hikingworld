import React from 'react';

export default class Message extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { };
    }


    render() {
        return(
            <div>message</div>

        );
    }
}
Message.propTypes = {
    message: React.PropTypes.object
};