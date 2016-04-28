import u                from 'updeep'
import actionTypes      from '/actions/actionTypes'
import ErrorResponse    from '/rest/ErrorResponse'
import Response         from '/rest/Response'
import Request          from '/rest/Request'

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
            const {
                request,
                response,
                error
            } = action.payload;
            const update = { isBusy: false };
            if (!action.error) {
                update.request = new Request(request);
                update.response = error != null
                    ? new ErrorResponse(error)
                    : new Response(response);
            }
            return u(update, state);
        default:
            return state;
    }   
}
