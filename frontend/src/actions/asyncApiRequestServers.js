import actionTypes from 'actions/actionTypes'
import { fetchServers } from 'rest/index'

const loadServers = function(limit) {
    return {
        types: [actionTypes.REQUEST_SERVERS_START, actionTypes.REQUEST_SERVERS_END],
        callAPI: () => fetchServers(limit)
    }    
};

export default loadServers;
