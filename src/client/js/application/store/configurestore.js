import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/root';

var loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
};

