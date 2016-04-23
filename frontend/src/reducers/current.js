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
        case actionTypes.FETCH_SETTINGS_END:
            const flows = action.payload.flows;
            return u({flow: () => flows && flows.length ? flows[0] : null}, state);
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
