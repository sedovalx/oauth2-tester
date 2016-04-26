import 'whatwg-fetch'
import { storeRequest } from 'services/clientRequestHistory'
import { createAction } from 'redux-actions'
import { serializeState } from 'services/stateService'
import actionTypes from 'actions/actionTypes'

export function runRequest(dispatch, currentState, navigate) {
    if (!(currentState && currentState.request && currentState.server && currentState.flow.code)) {
        return Promise.resolve();
    }

    const originalRequest = currentState.request;
    const encodedState = serializeState(currentState);
    const req = originalRequest.clone({queryParams: [].concat(originalRequest.queryParams, [{key: 'state', value: encodedState}])});
    storeRequest(req);
    dispatch(createAction(actionTypes.EXCHANGE_REQUEST_START)(req));

    if (navigate) {
        window.location.href = req.fullUri;
    } else {
        fetch('/api/auth/exchange-code-for-token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uri: req.fullUri,
                headers: req.headers,
                body: req.body
            })
        }).then(response => {
            return response.json().then(body => ({ response, body }));
        }).then(response => {
            console.log(response);
            return dispatch(createAction(actionTypes.EXCHANGE_REQUEST_END)(response));
        }).catch(err => {
            return dispatch(createAction(actionTypes.EXCHANGE_REQUEST_END)(err));
        });
    }
}