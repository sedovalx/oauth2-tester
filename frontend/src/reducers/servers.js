import u from 'updeep'
import actionTypes from 'actions/actionTypes'

export default function(state = { isFetching: false, items: [] }, action) {
    const addItem = (items) => [].concat(items, [action.payload]);

    switch (action.type) {
        case actionTypes.REQUEST_SERVERS_START:
            return u({ isFetching: true }, state);
        case actionTypes.REQUEST_SERVERS_END:
            let newState = u({ isFetching: false }, state);
            return action.error ? newState : u({items: action.payload}, newState);
        case actionTypes.SAVE_SERVER_END:
            return !action.error ? u({items: addItem}, state) : state;
        default:
            return state;
    }
}