import u from 'updeep'

const addError = err => items => [].concat(items, [err]);

const defaultState = {
    items: [],
    last: null
};

export default function(state = defaultState, action) {
    if (action.error){
        return u({
            last: action.payload,
            items: addError(action.payload)
        }, state);
    } else {
        return state;
    }
}