import React from 'react';
import FacebookWall from './facebookwall/facebookwall';

export default class FrontPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return(
            <div>
                <FacebookWall />
            </div>
        );
    }
}


