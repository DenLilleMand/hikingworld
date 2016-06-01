import { expect, assert } from 'chai';
import sinon from 'sinon';
import db from '../../../../src/server/model/models/db';
import crypto from 'crypto';

describe('account and session relationship', () => {
    describe('When creating a session, and we want to add an account fk ', () => {
        describe('The account sequelize model', () => {

        });
        describe('The sequelize persisted session', () => {
            var session = null;
            beforeEach(() => {
                session = {
                    sessionId: crypto.randomBytes(64).toString('base64'),
                    expire: 2323232323,
                    data: "{json:{haha:haha}}"
                }
            });
            afterEach(() => {
                session = null;
            });
            it('has to have a setAccount method ', (done) => {
                return db.Sessions.create(session).then((persistedSession) => {
                    expect(persistedSession).to.have.deep.property("setAccount");
                    done();
                });
            });
            it('has to have a getAccount method', (done) => {
                return db.Sessions.create(session).then((persistedSession) => {
                    expect(persistedSession).to.have.deep.property("getAccount");
                    done();
                });
            });
            it('has to delete a session', (done) => {
                return db.Sessions.deleteSession(session).then(() => {
                    done();
                })
            });
        })
    });

});
