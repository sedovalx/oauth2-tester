import actionTypes from 'actions/actionTypes'
import { fetchUriCodeFlow } from 'rest/index'

export default (serverName, scope, state) => ({
    types: [actionTypes.FETCH_AUTH_URI_CODE_START, actionTypes.FETCH_AUTH_URI_CODE_END],
    callAPI: () => fetchUriCodeFlow(serverName, scope, state)
});
