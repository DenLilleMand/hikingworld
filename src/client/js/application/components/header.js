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
                        <h1 id="title">HIKING WORLD - (now with ci)THE BEST HIKING THINGY IN THE WORLD!!!</h1>
                    </div>
                </header>
            </div>
        );
    }
}
/**<div className="navbar-collapse collapse">
 <ul className="menu nav navbar-nav">
 <Link to="/">menu1</Link>
 <Link to="/">menu2</Link>
 <Link to="/">menu3</Link>
 <Link to="/">menu4</Link>
 </ul>
 </div>*/
