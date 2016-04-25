import { storeRequest } from 'services/clientRequestHistory'
import { createAction } from 'redux-actions'
import { serializeState } from 'services/stateService'
import actionTypes from 'actions/actionTypes'

export function runRequest(request, dispatch, currentState) {
    if (!(request && currentState && currentState.server && currentState.flow.code)) 
        return Promise.resolve();

    if (currentState.flow.code === 'CODE_FLOW' && !currentState.server.authCode) {
        const encodedState = serializeState(currentState);
        request.queryParams.push({key: 'state', value: encodedState});
        storeRequest(request);
        dispatch(createAction(actionTypes.EXCHANGE_REQUEST_START)(request));
        window.location.href = request.fullUri;
    }
}