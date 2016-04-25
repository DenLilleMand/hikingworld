import {Map} from 'immutable';
import _ from 'lodash';

const GET_USERS = 'GET_USERS';
const initialState = {
    users: new Map(),
    user: {}
};


export function users(state = initialState, action = {}) {
    switch(action.type) {
        case GET_USERS:
            return state;
            break;
        case 'CREATE_USER':
            return state;
            break;
        default:
            return state;
    }

}
