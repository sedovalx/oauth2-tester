import 'whatwg-fetch'
import { createAction }     from 'redux-actions'
import { storeRequest }     from '/services/clientRequestHistory'
import { serializeState }   from '/services/stateService'
import actionTypes          from '/actions/actionTypes'
import Request              from '/rest/Request'
import Response             from '/rest/Response'
import ErrorResponse        from '/rest/ErrorResponse'

export function runRequest(dispatch, currentState) {
    if (!(currentState && currentState.request && currentState.server && currentState.flow.code)) {
        return Promise.resolve();
    }

    const originalRequest = currentState.request;
    const encodedState = serializeState(currentState);
    const req = originalRequest.clone({queryParams: [].concat(originalRequest.queryParams, [{key: 'state', value: encodedState}])});
    storeRequest(req);
    dispatch(createAction(actionTypes.EXCHANGE_REQUEST_START)(req));

    if (req.shouldNavigate) {
        window.location.href = req.fullUri;
    } else {
        fetch('/api/request', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                method: req.method,
                uri: req.fullUri,
                headers: req.headers,
                body: req.body,
                mimeType: 'application/json',
                charset: 'UTF-8'
            })
        }).then(response => {
            return response.json().then(body => body);
        }).then(result => {
            const { request, response, error } = result;
            // restore Request, Response, ErrorResponse objects from the server result
            return dispatch(createAction(actionTypes.EXCHANGE_REQUEST_END)({
                request: new Request({
                    method: request.method,
                    headers: request.headers,
                    body: request.body,
                    shouldNavigate: originalRequest.shouldNavigate,
                    acquireCode: originalRequest.acquireCode, 
                    acquireToken: originalRequest.acquireToken
                }).cloneWithUri(request.uri),
                response: response && new Response(response),
                error: error && new ErrorResponse(error)
            }));  
        }).catch(err => {
            return dispatch(createAction(actionTypes.EXCHANGE_REQUEST_END)(err));
        });
    }
}