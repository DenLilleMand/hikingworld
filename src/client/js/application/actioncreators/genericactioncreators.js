import superagent from 'superagent';
import { REMOTE_URL } from '../constants/remoteconstants';
import { GET_ALL_, CREATE_, UPDATE_, GET_, DELETE_ } from '../constants/genericconstants';
import { ERROR_ } from '../constants/errorconstants';
const SEPARATOR = '/';
const API_ENDPOINT = REMOTE_URL + 'api' + SEPARATOR;

class GenericActionCreators {

    constructor() {
        this.asyncCreate = this.asyncCreate.bind(this);
        this.asyncDelete = this.asyncDelete.bind(this);
        this.asyncUpdate = this.asyncUpdate.bind(this);
        this.asyncGetAll = this.asyncGetAll.bind(this);
    }


    error(type, error) {
        return {
            type,
            error
        }
    }

    /**
     * Generic action used to create new entities.
     * @param data
     * @param user
     * @param type
     * @returns {Function}
     */
    asyncCreate(data, user,  type) {
        return (dispatch) => {
            superagent.post(API_ENDPOINT+type.toLowerCase())
                .set('Content-Type','application/json')
                .set('Accept', 'application/json')
                .send(data)
                .end((err, res) => {
                if(res.statusCode === 200) {
                    console.log('res:', res);
                    dispatch(this.create(res.body.data,type));
                } else {
                    dispatch(this.error(
                        ERROR_+type.toUpperCase(),
                        res.body
                    ));
                }
            });
        }
    }

    create(data, type) {
        return {
            type:CREATE_ + type.toUpperCase(),
            data
        }
    }

    /**
     * Generic action used to update entities.
     * @param data(Object)
     * @param type(String)
     * @returns {Function}
     */
    asyncUpdate(data, user, type) {
        return (dispatch) => {
            superagent.put(API_ENDPOINT+type.toLowerCase()+SEPARATOR+id).send(data).end((err, res) => {
                if(res.status === 200) {
                    dispatch(this.update(res.body.data,type));
                } else {
                    dispatch(this.error(ERROR_+type.toUpperCase()));
                }
            });
        }
    }

    update(data, type) {
        return {
            type:UPDATE_ + type.toUpperCase(),
            data
        }
    }

    /**
     * Generic actionCreator used to delete entities.
     * @param id(Integer)
     * @param type(String)
     * @returns {Function}
     */
    asyncDelete(id, user, type) {
        return (dispatch) => {
            superagent.del(API_ENDPOINT+type.toLowerCase()+SEPARATOR+id).end((err, res) => {
                if(res.status === 200 ) {
                    dispatch(this.delete(id,type));
                } else {
                    dispatch(this.error(ERROR_+type.toUpperCase(), res.body));
                }
            });
        }
    }

    delete(id, type) {
        return {
            type:DELETE_ + type.toUpperCase(),
            id
        }
    }

    asyncGetAll(user, type) {
        return (dispatch) => {
            superagent.get(API_ENDPOINT+type.toLowerCase())
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if(err) {
                        console.log('error was thrown:', err);
                    } else if(res.statusCode === 200) {
                        dispatch(this.getAll(res.body.data, type));
                    } else if(res.statusCode === 404) {
                        console.log('AsyncGetAll with type ' + type + ' status 404');
                        dispatch(this.error());
                    }
                });
        };
    }

    getAll(data, type) {
        return {
            type: GET_ALL_+type.toUpperCase(),
            data
        }
    }
}

var genericActionCreators = new GenericActionCreators();

export default genericActionCreators;
