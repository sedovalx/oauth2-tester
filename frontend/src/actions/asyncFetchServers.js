import fetch from 'isomorphic-fetch'
import { createAction } from 'redux-actions'
import actionTypes from 'actions/actionTypes'

const requestServers = createAction(actionTypes.REQUEST_SERVERS_START);
const receivedServers = createAction(actionTypes.REQUEST_SERVERS_END);
const asyncFetchServers = (limit) => {
    return function (dispatch) {
        // start loading servers
        dispatch(requestServers());

        let uri = '/api/servers';
        if (limit) {
            uri += `?limit=${limit}`;
        }

        return fetch(uri)
            .then(response => response.json())
            .then(json => dispatch(receivedServers(json)))
            .catch(error => dispatch(receivedServers(error)))
    }
};

export default asyncFetchServers;
