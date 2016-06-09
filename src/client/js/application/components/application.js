require('../../../assets/sass/application.scss');
import React from 'react';
import Header from './header';
import Footer from './footer';


export default class Application extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { };
    }

    render() {
        return(
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );

    }

}