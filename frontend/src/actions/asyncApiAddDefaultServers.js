import actionTypes from 'actions/actionTypes'
import { createDefaultServers } from 'rest/index'

export default () => {
    return {
        types: [actionTypes.FETCH_SERVERS_START, actionTypes.FETCH_SERVERS_END],
        callAPI: () => createDefaultServers()
    }
}


