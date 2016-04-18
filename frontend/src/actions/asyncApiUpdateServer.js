import actionTypes from 'actions/actionTypes'
import { updateServer } from 'rest/index'

export default function(server) {
    return {
        types: [actionTypes.SAVE_SERVER_START, actionTypes.SAVE_SERVER_END],
        callAPI: () => updateServer(server)
    }
}
