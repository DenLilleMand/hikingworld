import superagent from 'superagent';
import { REMOTE_URL } from '../constants/remoteconstants';
import { CREATE_POST, DELETE_POST, GET_POSTS } from '../store/reducers/posts';

class PostActionCreators {

    constructor() {
        this.asyncCreatePost = this.asyncCreatePost.bind(this);
        this.asyncDeletePost = this.asyncDeletePost.bind(this);
        this.asyncUpdatePost = this.asyncUpdatePost.bind(this);
        this.asyncGetPosts = this.asyncGetPosts.bind(this);
    }

    asyncCreatePost(post, user) {
        return (dispatch) => {
            console.log('asyncCreatePost was called');
            superagent.post(REMOTE_URL + 'api/post')
                .send({
                    post,
                    user
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .end((res, err) => {
                    if(err) {
                        console.log('err:', err);
                        //dispatch(errorHandler);
                    } else if(res.body.status === 201) {
                        dispatch(this.createPost(res.body.data));
                    }
                });
        }
    }

    createPost(post) {
        console.log('create post was called');
        return {
            type: CREATE_POST,
            data: {
                post
            }
        }
    }

    asyncDeletePost(id, user) {
        return (dispatch) => {

        }
    }

    asyncUpdatePost(post, user) {
        return (dispatch) => {

        }

    }

    asyncGetPost(id, user) {
        return (dispatch) => {

        }

    }

    asyncGetPosts(user) {
        return (dispatch) => {

        }

    }


    deletePost(id, user) {

    }

    updatePost(post, user) {

    }

    getPost(id, user) {

    }

    getPosts(user) {

    }
}


var postActionCreators = new PostActionCreators();
export default postActionCreators;