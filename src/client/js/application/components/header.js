import React from 'react';
import { Link } from 'react-router';

export default class Footer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return(
            <div>
                <header className="navbar" id="navbar" role="banner">
                    <div className="container">
                        <h1 id="title">HIKING WORLD - (now with ci) THE BEST HIKING THINGY IN THE WORLD!!!</h1>
                    </div>
                </header>
            </div>
        );
    }
}
