import actionTypes      from '/actions/actionTypes'
import { fetchServers } from '/rest/index'

const loadServers = function(limit) {
    return {
        types: [actionTypes.FETCH_SERVERS_START, actionTypes.FETCH_SERVERS_END],
        callAPI: () => fetchServers(limit)
    }    
};

export default loadServers;
