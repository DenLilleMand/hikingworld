import { expect, assert } from 'chai';
import sinon from 'sinon';
import postActions from '../../../../src/client/js/application/actioncreators/postactioncreators';
import { CREATE_, UPDATE_, DELETE_, GET_ALL_ } from '../../../../src/client/js/application/constants/genericconstants';
import { POST } from '../../../../src/client/js/application/constants/typeconstants';

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
                    type: CREATE_ + POST,
                    data: {
                        post
                    }
                };
                expect(postActions.createPost(post)).to.deep.equal(expectedAction);
                done();
            });
        });
        describe('update', () => {
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
                postActions.updatePost(post);
                done();
            });
            it('It should return the correct action', (done) => {
                var expectedAction = {
                    type: UPDATE_ + POST,
                    data: {
                        post
                    }
                };
                expect(postActions.updatePost(post)).to.deep.equal(expectedAction);
                done();
            });
        });
    });
});
