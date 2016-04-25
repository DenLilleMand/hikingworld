import React from 'react';
import FacebookWall from './facebookwall/facebookwallcontainer';
import { createUser} from '../actioncreators/useractioncreators';
import { connect } from 'react-redux';

class FrontPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return(
            <div>
                <FacebookWall />
            </div>
        );
    }
}

function getState(state) {
    return state;
}

export default connect(getState)(FrontPage);

