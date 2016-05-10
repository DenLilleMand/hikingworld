import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/application';

import FrontPage from './components/frontpage';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import configureStore from './store/configurestore.js';

const store = configureStore();
console.log('store:', store);
console.log('getState():', store.getState());

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path={'/'} component={Application}>
                <IndexRoute component={FrontPage}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));