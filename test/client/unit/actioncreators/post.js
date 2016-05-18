import { expect, assert } from 'chai';
import sinon from 'sinon';
import postActions from '../../../../src/client/js/application/actioncreators/postactioncreators';
import { CREATE_POST, UPDATE_POST, DELETE_POST, GET_ALL_POSTS } from '../../../../src/client/js/application/store/reducers/posts';

describe('post action creators', () => {
    describe('When called with valid input', () => {
        describe('create', () => {
            var post = null;
            beforeEach(() => {
                post = {
                    id: 1,
                    description: "Some valid description"
                }
            });
            afterEach(() => {
                post = null;
            });
            it('It should not throw an error', (done) => {
                postActions.createPost(post);
                done();
            });
            it('It should return the correct action', (done) => {
                var expectedAction = {
                    type: CREATE_POST,
                    data: {
                        post
                    }
                };
                expect(postActions.createPost(post)).to.deep.equal(expectedAction);
                done();
            });
        });
    });
});
