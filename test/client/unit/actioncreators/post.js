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
            it('It should return the correct action', () => {
                var expectedAction = {
                    type: CREATE_ + POST,
                    data: {
                        post
                    }
                };
                expect(postActions.createPost(post)).to.deep.equal(expectedAction);
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
    describe('When called with invalid input', () => {
        it('Throws a TypeError if the input type for createPost isn\'t a object', (done) => {
            var spy  = sinon.spy(postActions, 'createPost');
            assert.throws(() => {postActions.createPost("herpderp")}, TypeError, "Invalid type:string");
            assert.throws(() => {postActions.createPost(666)}, TypeError, "Invalid type:number");
            assert.throws(() => {postActions.createPost(666.66)}, TypeError, "Invalid type:number");
            assert.throws(() => {postActions.createPost()}, TypeError, "Invalid type:undefined");
            setTimeout(() => {
                expect(spy.alwaysThrew(TypeError));
                done();
            }, 0);
        });
    });
});
