import Immutable from 'immutable';
import _ from 'lodash';

export default class CRUD {
    /**
     *
     * @param data
     * @param state
     * @returns {Object}
     */
    static create(data, state) {
        return _.extend({}, state, {
            map: state.map.set("" + data.id, data)
        });
    }

    /**
     *
     * @param data
     * @param state
     * @returns {Object}
     */
    static update(data, state) {
        return _.extend({}, state, {
            map: state.map.update("" + data.id, function () {
                return data;
            })
        });
    }

    /**
     *
     * @param id
     * @param state
     * @returns {Object}
     */
    static remove(data, state) {
        return _.extend({}, state, {
            map: state.map.remove("" + data.id)
        });
    }

    /**
     *
     * @param data
     * @param state
     * @returns {Object}
     */
    static getAll(data, state) {
        let mapStructure = {};
        data.forEach(function (element) {
            mapStructure[element.id] = element;
        });
        return _.extend({}, state, {
            map: new Immutable.Map(mapStructure)
        });
    }
}

