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
    if (server && flow && flow.code) {
        if (server.authToken) {
            request.headers.push({ key: 'Authorization', value: 'Bearer ' + server.authToken });
        }

        request.headers.push({key: 'Accept', value: 'application/json'});

        if (flow.code === flowTypes.CODE_FLOW) {
            if (!(server.authCode && server.authToken)) {
                // Step 1: Authorization Code Link
                request.method = 'GET';
                request.baseUri = server.authEndpoint;
                request.queryParams.push({ key: 'response_type', value: 'code' });
                request.queryParams.push({ key: 'client_id', value: server.clientID });
                request.queryParams.push({ key: 'redirect_uri', value: callbackUri });
            } else if (server.authCode) {
                // Step 4: Application Requests Access Token
                request.method = 'POST';
                request.baseUri = server.tokenEndpoint;
                request.queryParams.push({ key: 'client_id', value: server.clientID });
                request.queryParams.push({ key: 'redirect_uri', value: callbackUri });
                request.queryParams.push({ key: 'client_secret', value: server.clientSecret });
                request.queryParams.push({ key: 'grant_type', value: 'authorization_code' });
                request.queryParams.push({ key: 'code', value: code });
            }
        }

        if (flow.code === flowTypes.CLIENT_FLOW) {
            if (!server.authToken) {
                request.method = 'POST';
                request.baseUri = server.tokenEndpoint;
                request.queryParams.push({ key: 'grant_type', value: 'client_credentials' });
                request.queryParams.push({ key: 'client_id', value: server.clientID });
                request.queryParams.push({ key: 'client_secret', value: server.clientSecret });
            }
        }
        if (flow.code === flowTypes.RESOURCE_FLOW) {
            if (!server.authToken) {
                request.method = 'POST';
                request.baseUri = server.tokenEndpoint;
                request.queryParams.push({ key: 'client_id', value: server.clientID });
                request.queryParams.push({ key: 'username', value: username });
                request.queryParams.push({ key: 'password', value: password });
            }
        }
    }
    return request;
}