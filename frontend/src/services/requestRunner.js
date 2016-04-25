import { storeRequest } from 'services/clientRequestHistory'
import { createAction } from 'redux-actions'
import { serializeState } from 'services/stateService'
import actionTypes from 'actions/actionTypes'

export function runRequest({dispatch, currentState, method, uri, headers}) {
    if (!(uri && currentState && currentState.server && currentState.flow.code && method)) 
        return Promise.resolve();

    if (currentState.flow.code === 'CODE_FLOW' && !currentState.server.authCode) {
        const encodedState = serializeState(currentState);
        const separator = uri.indexOf('?') >= 0 ? '&' : '?';
        const fullUri = uri + separator + 'state=' + encodedState;
        const request = { method, uri: fullUri, headers, body: null };
        storeRequest(request);
        dispatch(createAction(actionTypes.EXCHANGE_REQUEST_START)(request));
        window.location.href = uri + separator + 'state=' + encodedState;
    }
}