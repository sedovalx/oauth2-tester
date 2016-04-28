import URI              from 'urijs'

function getDefined(param, defaultValue) {
    return param === undefined ? defaultValue : param;
}

class Request {
    constructor({method, baseUri, queryParams, headers, body, shouldNavigate, acquireCode, acquireToken} = {}) {
        this.method = method || 'GET';
        this.baseUri = baseUri || '';
        this.queryParams = (queryParams || []).filter(p => p.key != null);
        this.headers = (headers || []).filter(h => h.key != null);
        this.body = body;
        this.shouldNavigate = shouldNavigate || false;
        this.acquireCode = acquireCode || false;
        this.acquireToken = acquireToken || false;
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

        if (!(uri.protocol() && uri.host())) {
            return this.clone({baseUri: uriString, queryParams: []});
        }

        const baseUri = uri.protocol() + "://" + uri.host() + uri.path();
        const params = Request.getQueryParams(uri);
        return this.clone({baseUri, queryParams: params});
    }

    /**
     * Clone the instance and update specified parameters of the clone
     * @returns {Request} updated clone
     */
    clone({method, baseUri, queryParams, headers, body, shouldNavigate, acquireCode, acquireToken} = {}) {
        return new Request({
            method: getDefined(method, this.method),
            baseUri: getDefined(baseUri, this.baseUri),
            queryParams: getDefined(queryParams, this.queryParams),
            headers: getDefined(headers, this.headers),
            body: getDefined(body, this.body),
            shouldNavigate: getDefined(shouldNavigate, this.shouldNavigate),
            acquireCode: getDefined(acquireCode, this.acquireCode),
            acquireToken: getDefined(acquireToken, this.acquireToken)
        });
    }

    static getQueryParams(uri) {
        if (typeof uri ===  'string') {
            uri = URI(uri).normalize();
        }
        const paramsObj = URI.parseQuery(uri.query());
        return Object.keys(paramsObj).map(key => ({ key: key, value: paramsObj[key] || "" }));
    }
    
    
}

export default Request;