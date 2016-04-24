import u from 'updeep'

const defaultState = {
    lastParamsUpdate: null
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case 'redux-form/CHANGE':
            if (action.field && action.field.search && action.field.search(/^params\[\d+]\..+/i) >= 0){
                return u({lastParamsUpdate: new Date()}, state)
            } else {
                return state;
            }
        default:
            return state;
    }
}
