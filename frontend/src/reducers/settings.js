import u from 'updeep'
import actionTypes from 'actions/actionTypes'

const defaultState = {
    flows: {
        items: [],
        current: null
    },
    credentials: {
        username: null,
        password: null
    },
    callbackUri: location.origin,
    title: 'OAuth 2.0 Tester'
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.FETCH_SETTINGS_END:
            const flows = action.payload.flows;
            const callbackUri = action.payload.callbackUri;
            return u({ flows: { items: flows, current: flows[0] }, callbackUri: location.origin + callbackUri }, state);
        default:
            return state;
    }
}
