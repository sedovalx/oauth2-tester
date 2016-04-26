import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import u from 'updeep'
import asyncApiFetchServers from 'actions/asyncApiFetchServers'
import asyncApiSaveServer from 'actions/asyncApiSaveServer'
import App from 'component/App'
import actionTypes from 'actions/actionTypes'
import { deserializeState } from 'services/stateService'
import { restoreRequest } from 'services/clientRequestHistory'
import Request from 'services/Request'

const mapStateToProps = state => ({
    state,
    isBusy: state.exchangeLog.isBusy
});

const mapDispatchToProps = dispatch => ({
    onInit: (state) => {
        dispatch(createAction(actionTypes.DEFAULT_STATE)(state));
        return dispatch(asyncApiFetchServers())
            .then(servers => {
                const parsedState = parseUri();
                // update current state
                if (parsedState) {
                    updateCurrentFlow(dispatch, state.refs.flows.items, parsedState.flow);
                    restoreCodeRequest(dispatch, parsedState.auth.code);
                    const currentServer = updateServerAuthInfo(servers.items, parsedState.server, parsedState.auth.code, parsedState.auth.token);
                    if (currentServer){
                        // select server in the list
                        dispatch(createAction(actionTypes.SERVER_SELECTED)(currentServer));
                        // save updated server data
                        return dispatch(asyncApiSaveServer(currentServer));
                    }
                }
            })
            .catch(err => dispatch(createAction(actionTypes.LOCAL_ERROR)(err)));
    }
});

function restoreCodeRequest(dispatch, code){
    if (!code) return;

    dispatch(createAction(actionTypes.EXCHANGE_REQUEST_END)({
        request: restoreRequest(),
        response: {
            status: {
                code: 200,
                reasonPhrase: "OK"
            },
            headers: [],
            uri: window.location.href,
            queryParams: Request.getQueryParams(window.location.href)
        }
    }));
}


function updateCurrentFlow(dispatch, flows, flowCode) {
    if (flowCode != null) {
        const currentFlow = flows.filter(f => f.code === flowCode)[0];
        dispatch(createAction(actionTypes.CURRENT_FLOW_UPDATE)(currentFlow));
    }
}

function updateServerAuthInfo(servers, serverName, authCode, authToken) {
    let currentServer = servers.filter(s => s.name === serverName)[0];
    if ((authCode || authToken) && !currentServer) {
        throw new Error(
            `Got an auth [code: ${authCode}] [authToken: ${authToken}] from URI but have no idea for witch server it was. Server name: [${serverName}]`)
    } else if (currentServer) {
        currentServer.authCode = authCode;
        currentServer.authToken = authToken;
    }
    return currentServer;
}

function parseUri() {
    const state = deserializeState(getParameterByName('state'));
    if (state) {
        state.auth = {
            code: getParameterByName('code'),
            token: getParameterByName('token')
        };
    }

    const errorCode = getParameterByName('error');
    if (errorCode) {
        let errorMessage = `Authorization error [${decodeURIComponent(errorCode)}].`;
        const errorDesc = getParameterByName('error_description');
        if (errorDesc) {
            errorMessage += ` Description: ${decodeURIComponent(errorDesc)}.`
        }
        const errorUri = getParameterByName('error_uri');
        if (errorUri) {
            errorMessage += ` Error URL: ${errorUri}.`
        }
        throw new Error(errorMessage)
    }
    return state;
}

//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);


