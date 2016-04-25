class Request {
    constructor({method, baseUri, queryParams, headers, body} = {}) {
        this._method = method || 'GET';
        this._baseUri = baseUri || '';
        this._queryParams = (queryParams || []).filter(p => p.key != null);
        this._headers = (headers || []).filter(h => h.key != null);
        this._body = body || '';
    }

    /**
     * Build full uri with baseUri and queryParams
     * @returns {String} full uri with base and parameters
     */
    get fullUri() {
        let uri = this._baseUri;
        if (this._queryParams.length) {
            uri += '?';
            this._queryParams.forEach(p => {
                uri += `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}&`;
            });
            uri = uri.slice(0, -1);
        }
        return uri;
    }
    
    cloneWithUri(uri) {

    }
}

export default Request;