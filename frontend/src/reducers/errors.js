import u from 'updeep'
import actionTypes from 'actions/actionTypes'

export default function(state = { last: null }, action) {
    switch (action.type) {
        case actionTypes.DELETE_SERVER_END:
        case actionTypes.FETCH_SERVERS_END:
        case actionTypes.SAVE_SERVER_END:
            if (action.error){
                return u({last: action.payload}, state);
            } else {
                return state;
            }
        default:
            return state;
    }
}