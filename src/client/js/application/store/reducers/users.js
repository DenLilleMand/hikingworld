import Immutable from 'immutable';

const GET_USERS = 'GET_USERS';
const initialState = {
    users: new Immutable.Map(),
    user: {}
};


export function users(state = initialState, action = {}) {
    if(!action.type) {
        return state;
    }
    switch(action.type) {
        case GET_USERS:
            return state;


            break;
        default:
            return state;
    }

}
