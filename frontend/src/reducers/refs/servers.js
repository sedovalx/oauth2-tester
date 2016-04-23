import u from 'updeep'
import actionTypes from 'actions/actionTypes'

const defaultState = {
    items: [],
    isFetching: false
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.FETCH_SERVERS_START:
            return u({ isFetching: true }, state);
        case actionTypes.FETCH_SERVERS_END:
            return fetchServerEnd(state, action);
        case actionTypes.SAVE_SERVER_END:
            return saveServerEnd(state, action);
        case actionTypes.DELETE_SERVER_START:
            return deleteServerStart(state, action);
        case actionTypes.DELETE_SERVER_END:
            return deleteServerEnd(state, action);
        default:
            return state;
    }
}

function deleteServerStart(state, action) {
    const serverId = action.payload;
    const arrayIdx = state.items.map(s => s.name).indexOf(serverId);
    return u({items: { [arrayIdx]: { isBusy: true } }}, state);
}

function addServers(servers){
    return items => {
        let copy = [].concat(items);
        let names = copy.map(s => s.name);
        servers.forEach(s => {
            if (names.indexOf(s.name) === -1) {
                copy.push(u({isBusy: false}, s))
            }
        });
        return copy.sort((a, b) => a.name.localeCompare(b.name));
    };
}

function fetchServerEnd(state, action) {
    return action.error
        ? state
        : u({items: addServers(action.payload.items), isFetching: false}, state);
}

function saveServerEnd(state, action) {
    if (action.error) {
        return state;
    }
    const serverId = action.payload.name;
    const arrayIdx = state.items.map(s => s.name).indexOf(serverId);
    return arrayIdx >= 0
        ? u({items: {[arrayIdx]: action.payload}}, state)
        : u({items: addServers([action.payload])}, state);
}

function deleteServerEnd(state, action) {
    if (action.error) {
        return state;
    }
    const newState = u({items: deleteServer(action.payload.deletedId)}, state);
    return state.selected && state.selected.name === action.payload.deletedId
        ? u({selected: null}, newState)
        : newState;
}

function deleteServer(id) {
    return items => {
        return [].concat(items.filter(i => i.name !== id));
    }
}
