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
    if (action.error) return state;

    switch (action.type) {
        case actionTypes.DEFAULT_STATE:
            const flows = action.payload.refs.flows.items;
            return u({flow: () => flows && flows.length ? flows[0] : null}, state);
        case actionTypes.CURRENT_FLOW_UPDATE:
            return u({flow: action.payload}, state);
        case actionTypes.FETCH_SERVERS_END:
            if (state.server && typeof state.server !== 'object') {
                // try find server by its restored from url name
                const name = state.server;
                const loadedServers = action.payload.items;
                let targetServer = loadedServers.filter(s => s.name === name)[0];
                if (targetServer) {
                    targetServer = u({authCode: state.auth.code, authToken: state.auth.token}, targetServer);
                }
                return u({ server: () => targetServer }, state);
            }
            return state;
        case actionTypes.SAVE_SERVER_END:
            if (state.server && state.server.name === action.payload.name) {
                return u({server: action.payload}, state);
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
