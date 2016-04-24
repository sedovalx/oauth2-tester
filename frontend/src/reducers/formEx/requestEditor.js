import u from 'updeep'
import actionTypes from 'actions/actionTypes'

const defaultState = {
    lastParamsUpdate: null,
    uriWithParams: ""
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case 'redux-form/CHANGE':
            if (action.field && action.field.search && action.field.search(/^params\[\d+]\..+/i) >= 0){
                return u({lastParamsUpdate: new Date()}, state)
            } else {
                return state;
            }
        case actionTypes.REQUEST_URI_REBUILD:
            return u({uriWithParams: action.payload}, state);
        default:
            return state;
    }
}
