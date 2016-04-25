import u from 'updeep'
import actionTypes from 'actions/actionTypes'
import Request from 'services/Request'

const defaultState = {
    flow: null,
    server: null,
    request: new Request(),
    auth: {
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
        case actionTypes.SAVE_SERVER_END:
            if (state.server && state.server.name === action.payload.name) {
                return u({server: action.payload}, state);
            }
            return state;
        case actionTypes.SERVER_SELECTED:
            return u({server: action.payload}, state);
        case actionTypes.DELETE_SERVER_END:
            if (state.server && state.server.name === action.payload.deletedId) {
                return u({server: null}, state);
            } else {
                return state;
            }
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
        case actionTypes.REQUEST_DATA_CHANGED:
            return u({request: action.payload}, state);
        default:
            return state;
    }
}
