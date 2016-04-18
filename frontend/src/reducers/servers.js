import u from 'updeep'
import actionTypes from 'actions/actionTypes'

export default function(state = { isFetching: false, selected: null, items: [] }, action) {
    const addServers = servers => items => [].concat(items, servers.map(s => u({isBusy: false}, s)));
    const deleteServer = id => items => [].concat(items.filter(i => i.id !== id));

    switch (action.type) {
        case actionTypes.FETCH_SERVERS_START:
            return u({ isFetching: true }, state);
        case actionTypes.FETCH_SERVERS_END:
            let newState = u({ isFetching: false }, state);
            return action.error ? newState : u({items: addServers(action.payload)}, newState);
        case actionTypes.SAVE_SERVER_END:
        {
            if (action.error) {
                return state;
            }
            const serverId = action.payload.id;
            const arrayIdx = state.items.map(s => s.id).indexOf(serverId);
            return arrayIdx >= 0
                ? u({items: {[arrayIdx]: action.payload}}, state)
                : u({items: addServers([action.payload])}, state);
        }
        case actionTypes.DELETE_SERVER_START:
            const serverId = action.payload;
            const arrayIdx = state.items.map(s => s.id).indexOf(serverId);
            return u({items: { [arrayIdx]: { isBusy: true } }}, state);
        case actionTypes.DELETE_SERVER_END:
        {
            if (action.error) {
                return state;
            }
            const newState = u({items: deleteServer(action.payload.deletedId)}, state);
            return state.selected && state.selected.id === action.payload.deletedId
                ? u({selected: null}, newState)
                : newState;
        }
        case actionTypes.SERVER_SELECTED:
            return u({selected: action.payload}, state);
        default:
            return state;
    }
}