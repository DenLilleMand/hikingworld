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
            superagent.post(REMOTE_URL + 'api/post')
                .send({
                    post,
                    user
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .end((res, err) => {
                    if(err) {
                        //dispatch(errorHandler);
                    } else if(res.body.status === 201) {
                        dispatch(this.createPost(res.body.data));
                    }
                });
        }
    }

    createPost(post) {
        return {
            type: CREATE_POST,
            data: {
                post
            }
        }
    }

    asyncDeletePost(id, user) {
        return (dispatch) => {
            superagent.delete(REMOTE_URL + 'api/post')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .end((res, err) => {
                    if(err || res.body.status === 404 ) {
                        //dispatch(serrorHandler());
                    } else if(res.body.status === 200) {
                        dispatch(this.deletePost(id));
                    }
                });
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