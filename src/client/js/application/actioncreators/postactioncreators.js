import superagent from 'superagent';
import { REMOTE_URL } from '../constants/remoteconstants';
import { CREATE_, DELETE_, GET_, UPDATE_ } from '../constants/genericconstants';
import { POST } from '../constants/typeconstants';


class PostActionCreators {

    constructor() {
        this.asyncCreatePost = this.asyncCreatePost.bind(this);
        this.asyncDeletePost = this.asyncDeletePost.bind(this);
        this.asyncUpdatePost = this.asyncUpdatePost.bind(this);
        this.asyncGetPosts = this.asyncGetPosts.bind(this);
    }

    asyncCreatePost(description) {
        if( typeof description !== 'object'  ) {
            throw new TypeError("Invalid type:"+typeof description);
        }
        let post = {
            description
        };
        return (dispatch) => {
            return superagent.post(REMOTE_URL + 'api/post')
                .send({
                    post
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('X-CSRF-Token', X_CSRF_Token)
                .end((res, err) => {
                    if(err) {
                        //dispatch(errorHandler);
                    } else if(res.body.status === 201) {
                        console.log('Data returned after asyncCreatePost:', res.body);
                        dispatch(this.createPost(res.body.data));
                    }
                });
        }
    }

    createPost(post) {
        if( typeof post !== 'object'  ) {
            throw new TypeError("Invalid type:"+typeof post);
        }
        return {
            type: CREATE_ + POST,
            data: {
                post
            }
        }
    }

    asyncDeletePost(id, user) {
        return (dispatch) => {
            return superagent.delete(REMOTE_URL + 'api/post')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('X-CSRF-Token', X_CSRF_Token)
                .end((res, err) => {
                    if(err || res.body.status === 404 ) {
                        //dispatch(serrorHandler());
                    } else if(res.body.status === 200) {
                        console.log('Data returned after asyncDeletePost:', res.body);
                        dispatch(this.deletePost(id));
                    }
                });
        }
    }

    deletePost(id) {
        return {
            type: DELETE_ + POST,
            id
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
            return superagent.get(REMOTE_URL + 'api/post')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('X-CSRF-Token', X_CSRF_Token)
                .end((res, error) => {
                    if(err) {
                        console.log('Err in asyncGetPosts:', err);
                    } else if(res.body.status === 200) {
                        console.log('data in asyncGetPosts', res.body);
                        dispatch(getPosts(res.body.posts));
                    } else if(res.body.status === 404) {
                        console.log('404 in asyncGetPosts');
                    }

                });
        };
    }

    getPosts(posts) {
        return {
            type: GET_ + POST,
            posts
        }
    }


    updatePost(post, user) {
        return {
            type: UPDATE_ + POST,
            data: {
                post
            }
        }
    }

    getPost(id, user) {

    }

}


var postActionCreators = new PostActionCreators();
export default postActionCreators;