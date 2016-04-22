import u from 'updeep'
import actionTypes from 'actions/actionTypes'

const defaultState = {
    log: [],
    isBusy: false
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case actionTypes.FETCH_AUTH_URI_CODE_START:
            return u({isBusy: true}, state);
        case actionTypes.FETCH_AUTH_URI_CODE_END:
            return u({isBusy: false}, state);
        default:
            return state;
    }   
}
