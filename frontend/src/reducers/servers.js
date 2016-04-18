import u from 'updeep'
import actionTypes from 'actions/actionTypes'

export default function(state = { isFetching: false, items: [] }, action) {
    const addServers = servers => items => [].concat(items, servers.map(s => u({isBusy: false}, s)));
    const deleteServer = id => items => [].concat(items.filter(i => i.id !== id));

    switch (action.type) {
        case actionTypes.FETCH_SERVERS_START:
            return u({ isFetching: true }, state);
        case actionTypes.FETCH_SERVERS_END:
            let newState = u({ isFetching: false }, state);
            return action.error ? newState : u({items: addServers(action.payload)}, newState);
        case actionTypes.SAVE_SERVER_END:
            return !action.error ? u({items: addServers([action.payload])}, state) : state;
        case actionTypes.DELETE_SERVER_START:
            const serverId = action.payload;
            const arrayIdx = state.items.map(s => s.id).indexOf(serverId);
            return u({items: { [arrayIdx]: { isBusy: true } }}, state);
        case actionTypes.DELETE_SERVER_END:
            return !action.error ? u({items: deleteServer(action.payload.deletedId)}, state) : state;
        default:
            return state;
    }
}