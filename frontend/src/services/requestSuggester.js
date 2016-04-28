import Request          from '/services/Request'
import { flowTypes }    from '/reducers/refs/flows'

/**
 * Build suggested request instance based on the current state of the application
 * @param server selected OAuth server
 * @param flow selected flow type
 * @param callbackUri callback uri for response
 * @param username user name for the Resource flow
 * @param password user password for the Resource flow
 * @returns {Request} new request
 */
export function suggestUri(server, flow, callbackUri, username, password) {
    let request = new Request();

    if (server && flow) {
        switch (flow.code) {
            case flowTypes.CODE_FLOW:
                suggest4CodeFlow(request, server, callbackUri);
                break;
            case flowTypes.IMPLICIT_FLOW:
                suggest4ImplicitFlow(request, server, callbackUri);
                break;
            case flowTypes.RESOURCE_FLOW:
                suggest4ResourceFlow(request, server, username, password);
                break;
            case flowTypes.CLIENT_FLOW:
                suggest4ClientFlow(request, server);
        }
    }
    return request;
}

function suggest4CodeFlow(request, server, callbackUri) {
    const { authCode, authToken, authEndpoint, tokenEndpoint, clientID, clientSecret } = server;

    if (authToken) {
        // GET request API
        addHeaderTokenBearer(request, authToken);
    } else if (!authCode) {
        // GET request auth code
        request.baseUri = authEndpoint;
        addParam(request, 'response_type', 'code');
        addParamClientId(request, clientID);
        addParamCallbackUri(request, callbackUri);
        request.shouldNavigate = true;
        request.acquireCode = true;
    } else if (authCode) {
        // POST request token
        request.method = 'POST';
        request.baseUri = tokenEndpoint;
        addParam(request, 'grant_type', 'authorization_code');
        addParam(request, 'code', authCode);
        addParamClientId(request, clientID);
        addParamClientSecret(request, clientSecret);
        addParamCallbackUri(request, callbackUri);
        addHeaderUrlencoded(request);
        addHeaderAcceptJson(request);
        request.acquireToken = true;
    }
}

function suggest4ImplicitFlow(request, server, callbackUri) {
    const { authToken, authEndpoint, clientID } = server;

    if (authToken) {
        // GET request API
        addHeaderTokenBearer(request, authToken);
    } else {
        // POST request token
        request.baseUri = authEndpoint;
        addParam(request, 'response_type', 'token');
        addParamClientId(request, clientID);
        addParamCallbackUri(request, callbackUri);
        addHeaderUrlencoded(request);
        request.shouldNavigate = true;
        request.acquireToken = true;
    }
}

function suggest4ResourceFlow(request, server, username, password) {
    const { tokenEndpoint, clientID, authToken } = server;

    if (authToken) {
        // GET request API
        addHeaderTokenBearer(request, authToken);
    } else {
        // POST request token
        request.method = 'POST';
        request.baseUri = tokenEndpoint;
        addParam(request, 'grant_type', 'password');
        addParam(request, 'username', username);
        addParam(request, 'password', password);
        addParamClientId(request, clientID);
        addHeaderUrlencoded(request);
        addHeaderAcceptJson(request);
        request.shouldNavigate = false;
        request.acquireToken = true;
    }
}

function suggest4ClientFlow(request, server) {
    const { tokenEndpoint, clientID, clientSecret, authToken } = server;

    if (authToken) {
        // GET request API
        addHeaderTokenBearer(request, authToken);
    } else {
        // POST request token
        request.method = 'POST';
        request.baseUri = tokenEndpoint;
        addParam(request, 'grant_type', 'client_credentials');
        addParamClientId(request, clientID);
        addParamClientSecret(request, clientSecret);
        addHeaderAcceptJson(request);
        addHeaderUrlencoded(request);
        request.shouldNavigate = false;
        request.acquireToken = true;
    }
}

function addHeaderTokenBearer(request, authToken) {
    addHeader(request, 'Authorization', 'Bearer ' + authToken);
}

function addHeaderUrlencoded(request) {
    addHeader(request, 'Content-Type', 'application/x-www-form-urlencoded');
}

function addHeaderAcceptJson(request) {
    addHeader(request, 'Accept', 'application/json');
}

function addParamClientId(request, clientID) {
    addParam(request, 'client_id', clientID);
}

function addParamCallbackUri(request, callbackUri) {
    addParam(request, 'redirect_uri', callbackUri);
}

function addParamClientSecret(request, clientSecret) {
    addParam(request, 'client_secret', clientSecret);
}

function addParam(request, key, value) {
    request.queryParams.push({ key, value });
}

function addHeader(request, key, value){
    request.headers.push({key, value});
}