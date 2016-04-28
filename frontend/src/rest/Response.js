class Response {
    constructor({status, headers, body, contentLength} = {}){
        this.status = status || { code: 200, reasonPhrase: 'OK', protocolVersion: 'HTTP/1.1' };
        this.headers = headers || [];
        this.body = body;
        this.contentLength = contentLength != null ? contentLength : -1;
    }
    
    getContentType(){
        const header = this.headers.filter(h => h.key === 'Content-Type')[0];
        return header ? header.value : null;
    }
}

export default Response;
