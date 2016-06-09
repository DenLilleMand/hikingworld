import React from 'react';
import FacebookWall from './facebookwall/facebookwallcontainer';
import { createUser} from '../actioncreators/useractioncreators';
import { connect } from 'react-redux';
import SidePane from './sidepane';

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
                <div className="col-md-4">
                    <SidePane />
                </div>
                <div className="col-md-8">
                    <FacebookWall />
                </div>
            </div>
        );
    }
}

function getState(state) {
    return state;
}

export default connect(getState)(FrontPage);

