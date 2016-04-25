import { Map } from 'immutable';
import CRUD from '../util/crud';
import { POST } from '../../constants/typeconstants';
import { CREATE_, UPDATE_, GET_ALL_, DELETE_ } from '../../constants/genericconstants';

const initialState = {
    map: new Map()
};

export function posts(state = initialState, action = {}) {
    switch(action.type) {
        case CREATE_ + POST:
            return CRUD.create(action.data, state);
            break;
        case DELETE_ + POST:
            return CRUD.delete(action.data, state);
            break;
        case UPDATE_ + POST:
            return CRUD.update(action.data, state);
            break;
        case GET_ALL_ + POST:
            console.log('Reducer received data:', action.data);
            return CRUD.getAll(action.data, state);
            break;
        default:
            return state;
    }

}