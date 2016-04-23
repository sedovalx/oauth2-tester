import u from 'updeep'
import actionTypes from 'actions/actionTypes'

const defaultState = {
    callbackUri: location.origin,
    title: 'OAuth 2.0 Tester'
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.FETCH_SETTINGS_END:
            const callbackUri = action.payload.callbackUri;
            return u({callbackUri: location.origin + callbackUri}, state);
        default:
            return state;
    }
}
