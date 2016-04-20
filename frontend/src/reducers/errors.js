import u from 'updeep'

export default function(state = { last: null }, action) {
    if (action.error){
        return u({last: action.payload}, state);
    } else {
        return state;
    }
}