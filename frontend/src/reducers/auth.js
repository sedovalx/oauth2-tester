import u from 'updeep'
import actionTypes from 'actions/actionTypes'

const defaultState = {
    authUri: null
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.FETCH_AUTH_URI_CODE_END:
            if (action.error) return state;
            return u({authUri: action.payload.uri}, state);
        default:
            return state;
    }
}
