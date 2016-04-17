import u from 'updeep'
import actionTypes from 'actions/actionTypes'

export default function(state = { isFetching: false, items: [] }, action) {
    switch (action.type) {
        case actionTypes.REQUEST_SERVERS_START:
            return u({ isFetching: true }, state);
        case actionTypes.REQUEST_SERVERS_END:
            let newState = u({ isFetching: false }, state);
            return action.error ? newState : u({items: action.payload}, newState);  
        default:
            return state;
    }
}