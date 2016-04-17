import actionTypes from 'actions/actionTypes'
import { saveServer } from 'rest/index'

export default function(serverDto) {
    return {
        types: [actionTypes.SAVE_SERVER_START, actionTypes.SAVE_SERVER_END],
        callAPI: () => saveServer(serverDto)
    }
}


