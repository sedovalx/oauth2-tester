import URI              from 'urijs'

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
    clone({method, baseUri, queryParams, headers, body} = {}) {
        return new Request({
            method: method === undefined ? this.method : method,
            baseUri: baseUri === undefined ? this.baseUri : baseUri,
            queryParams: queryParams === undefined ? this.queryParams : queryParams,
            headers: headers === undefined ? this.headers : headers,
            body: body === undefined ? this.body : body
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