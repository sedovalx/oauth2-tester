import u from 'updeep'
import actionTypes from 'actions/actionTypes'

const defaultState = {
    flows: {
        current: null
    },
    credentials: {
        username: null,
        password: null
    },
    callbackUri: location.origin,
    title: 'OAuth 2.0 Tester'
};

function getCurrentFlow(flows, current, flowCode) {
    return () => {
        const found = flows.filter(f => f.code === flowCode);
        return found.length ? found[0] : current;
    }
}

export default function(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.FETCH_SETTINGS_END:
            const callbackUri = action.payload.callbackUri;
            const flows = action.payload.flows;
            return u({
                callbackUri: location.origin + callbackUri,
                flows: { current: () => flows && flows.length ? flows[0] : null }
            }, state);
        case actionTypes.SETTINGS_MODAL_CLOSE:
            if (!action.payload) {
                return state;
            }
            
            const {
                currentFlow,
                username,
                password
            } = action.payload;
            return u({
                flows: { current: currentFlow },
                credentials: {
                    username: username,
                    password: password
                }
            }, state);
        default:
            return state;
    }
}
