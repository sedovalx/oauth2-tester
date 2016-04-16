import { createAction } from 'redux-actions'

import actionTypes from 'actions/actionTypes'
import { fetchServers } from '../rest'

const requestServers = createAction(actionTypes.REQUEST_SERVERS_START);
const receivedServers = createAction(actionTypes.REQUEST_SERVERS_END);
const requestServersAsync = (limit) => {
    return function (dispatch) {
        // start loading servers
        dispatch(requestServers());

        return fetchServers(limit)
            .then(response => response.json())
            .then(json => dispatch(receivedServers(json)))
            .catch(error => dispatch(receivedServers(error)))
    }
};

export default requestServersAsync;
