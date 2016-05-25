import { expect, assert } from 'chai';
import sinon from 'sinon';
import postActions from '../../../../src/client/js/application/actioncreators/postactioncreators';
import { CREATE_POST, UPDATE_POST, DELETE_POST, GET_ALL_POSTS } from '../../../../src/client/js/application/store/reducers/posts';

describe('post action creators', () => {
    describe('When called with valid input', () => {
        describe('async create', () => {
            it('It should not throw an error', (done) => {
                assert.isTrue(false);

                done();
            });
            it('It should return the correct action', (done) => {

                assert.isTrue(false);
                done();
            });
        });
        describe('async update', () => {
            it('It should not throw an error', (done) => {

                assert.isTrue(false);
                done();
            });
            it('It should return the correct action', (done) => {

                assert.isTrue(false);
                done();
            });
        });
        describe('async delete', () => {
            it('It should not throw an error', (done) => {

                assert.isTrue(false);
                done();
            });
            it('It should return the correct action', (done) => {
                assert.isTrue(false);
                done();
            });
        });
        describe('async getAll', () => {
            it('It should not throw an error', (done) => {

                assert.isTrue(false);
                done();
            });
            it('It should return the correct action', (done) => {
                assert.isTrue(false);
                done();
            });

        });
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
        describe('update', () => {
            it('It should not throw an error', (done) => {
                assert.isTrue(false);
                done();
            });
            it('It should return the correct action', (done) => {
                assert.isTrue(false);
                done();
            });
        });
        describe('delete', () => {
            it('It should not throw an error', (done) => {
                assert.isTrue(false);
                done();
            });
            it('It should return the correct action', (done) => {
                assert.isTrue(false);
                done();
            });
        });
        describe('getAll', () => {
            it('It should not throw an error', (done) => {
                assert.isTrue(false);
                done();

            });
            it('It should return the correct action', (done) => {
                assert.isTrue(false);
                done();

            });

        });
    });

    describe('When called with invalid input', () => {
        describe('create', () => {
            it('It should throw a type error', (done) => {
                assert.isTrue(false);
            });
        });
        describe('update', () => {
        });
        describe('delete', () => {
        });
        describe('getAll', () => {
        });

    });

});
