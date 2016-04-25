import u from 'updeep'
import actionTypes from 'actions/actionTypes'

const defaultState = {
    request: null,
    response: null,
    isBusy: false
};

export default function (state = defaultState, action) {
    if (action.error) return state;
    
    switch (action.type) {
        case actionTypes.EXCHANGE_REQUEST_START:
            return u({
                isBusy: true,
                request: action.payload,
                response: null
            }, state);
        case actionTypes.EXCHANGE_REQUEST_END:
            return u({
                isBusy: false,
                response: action.payload
            });
        default:
            return state;
    }   
}
