import actionTypes      from '/actions/actionTypes'
import { deleteServer } from '/rest/index'

export default function(server) {
    return {
        types: [actionTypes.DELETE_SERVER_START, actionTypes.DELETE_SERVER_END],
        callAPI: () => deleteServer(server),
        actionBody: {
            payload: server.name
        },
        contentType: null,
        handleResponse: () => { return {deletedId: server.name} }
    }
}
