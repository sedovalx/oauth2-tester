import u from 'updeep'
import initialState from 'config/initialState'
import actionTypes from 'actions/actionTypes'

export default function index(state = initialState, action) {
    switch (action.type) {
        case actionTypes.REQUEST_SERVERS_START:
            return u({servers: { isFetching: true }}, state);
        case actionTypes.REQUEST_SERVERS_END:
            let newState = u({servers: { isFetching: false }}, state); 
            if (action.error) {
                return u({errors: {last: action.payload}})
            } else {
                return u({servers: {items: action.payload}}, newState);
            }
        default:
            return state;
    }
}