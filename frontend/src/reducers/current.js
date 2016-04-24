import u from 'updeep'
import actionTypes from 'actions/actionTypes'

const defaultState = {
    flow: null,
    server: null,
    auth: {
        code: null,
        token: null,
        username: null,
        password: null
    }
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.DEFAULT_STATE:
            const flows = action.payload.refs.flows.items;
            return u({flow: () => flows && flows.length ? flows[0] : null}, state);
        case actionTypes.CURRENT_STATE:
            if (action.error) return state;
            let newState = u({}, state);
            if (action.payload.server) {
                newState = u({server: action.payload.server}, newState);
            }
            if (action.payload.flow) {
                newState = u({flow: action.payload.flow}, newState);
            }
            if (action.payload.auth) {
                newState = u({auth: action.payload.auth}, newState);
            }
            return newState;
        case actionTypes.FETCH_SERVERS_END:
            if (state.server && typeof state.server !== 'object' && !action.error) {
                // try find server by its restored from url name
                const name = state.server;
                const loadedServers = action.payload.items;
                return u({
                    server: () => loadedServers.filter(s => s.name === name)[0]
                }, state);
            }  
            return state;
        case actionTypes.SERVER_SELECTED:
            return u({server: action.payload}, state);
        case actionTypes.SETTINGS_MODAL_CLOSE:
            if (!action.payload) return state;
            const {
                currentFlow,
                username,
                password
            } = action.payload;
            return u({
                flow: currentFlow,
                auth: {
                    username: username,
                    password: password
                }
            }, state);
        default:
            return state;
    }
}
