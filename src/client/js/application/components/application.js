require('../../../assets/sass/application.scss');
import React from 'react';
import Header from './header';
import Footer from './footer';
import SidePane from './sidepane';

export default class Application extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { };
    }

    render() {
        return(
            <div>
                <Header />
                <SidePane />
                {this.props.children}
                <Footer />
            </div>
        );

    }

}