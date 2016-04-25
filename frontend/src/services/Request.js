import URI from 'urijs'
import { flowTypes } from 'reducers/refs/flows'

class Request {
    constructor({method, baseUri, queryParams, headers, body} = {}) {
        this.method = method || 'GET';
        this.baseUri = baseUri || '';
        this.queryParams = (queryParams || []).filter(p => p.key != null);
        this.headers = (headers || []).filter(h => h.key != null);
        this.body = body || '';
    }

    /**
     * Build full uri with baseUri and queryParams
     * @returns {String} full uri with base and parameters
     */
    get fullUri() {
        const uri = URI(this.baseUri);
        if (this.queryParams.length) {
            this.queryParams.forEach(p => {
                uri.addSearch({[p.key]: p.value })
            });
        }
        return uri.toString();
    }

    /**
     * Parses passed uri string and updates current baseUri and parameters
     * @param uriString full uri string
     * @returns { Request } clone with updated fields
     */
    cloneWithUri(uriString) {
        if (!uriString) {
            return this.clone({baseUri: "", queryParams: []});
        }
        const uri = URI(uriString).normalize();
        console.log(uri.protocol() + "  " + uri.host() + "  " + uri.path());
        
        if (!(uri.protocol() && uri.host())) {
            return this.clone({baseUri: uriString, queryParams: []});
        }

        const baseUri = uri.protocol() + "://" + uri.host() + uri.path();
        const paramsObj = URI.parseQuery(uri.query());
        const params = Object.keys(paramsObj).map(key => ({ key: key, value: paramsObj[key] || "" }));
        return this.clone({baseUri, queryParams: params});
    }

    clone({method, baseUri, queryParams, headers, body} = {}) {
        return new Request({
            method: method === undefined ? this.method : method,
            baseUri: baseUri === undefined ? this.baseUri : baseUri,
            queryParams: queryParams === undefined ? this.queryParams : queryParams,
            headers: headers === undefined ? this.headers : headers,
            body: body === undefined ? this.body : body
        });
    }
    
    static buildFromState(server, flow, callbackUri, username, password) {
        let request = new Request();
        if (server && flow && flow.code) {
            if (server.authToken) {
                request.headers.push({ key: 'Authorization', value: 'Bearer ' + server.authToken });
            }

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
}

export default Request;