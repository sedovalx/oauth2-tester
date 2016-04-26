import u from 'updeep'
import actionTypes from 'actions/actionTypes'

const defaultState = {
    request: null,
    response: null,
    isBusy: false  
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case actionTypes.EXCHANGE_REQUEST_START:
            return u({
                isBusy: true,
                request: action.payload,
                response: null
            }, state);
        case actionTypes.EXCHANGE_REQUEST_END:
            const update = { isBusy: false };
            if (!action.error) {
                update.response = action.payload;
            }
            return u(update, state);
        default:
            return state;
    }   
}
