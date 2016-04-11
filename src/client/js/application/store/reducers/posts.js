import Immutable from 'immutable';

export const GET_POSTS = 'GET_POSTS', CREATE_POST =  'CREATE_POST', DELETE_POST = 'DELETE_POST';
const initialState = {
    posts: new Immutable.Map()
};

export function posts(state = initialState, action = {}) {
    if(!action.type) {
        return state;
    }
    switch(action.type) {
        case CREATE_POST:
            console.log('reducer posts was called');
            let post = action.data.post;
            return state.posts.set(post.id, post);
            break;
        case DELETE_POST:
            let id = action.data.id;
            return state.posts.delete(id + "");
            break;
        case GET_POSTS:
            return state.posts;
            break;
        default:
            return state;
    }

}