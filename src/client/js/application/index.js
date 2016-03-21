import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/application';
import FrontPage from './components/frontpage';
import { Provider } from 'react-redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import configureStore from './store/configurestore.js';

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path={'/'} component={Application}>
                <IndexRoute component={FrontPage}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));