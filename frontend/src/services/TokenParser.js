import contentTypeParser from 'content-type'

class TokenParser {
    static parseBody(contentTypeHeader, body) {
        let contentTypeObj = TokenParser.parseContentType(contentTypeHeader);
        switch (contentTypeObj.type) {
            case 'application/json':
                return TokenParser.tryParseAsJson(body);
            case 'text/plain':
                return TokenParser.tryParseAsText(body);
            default:
                return null;
        }
    }

    static parseContentType(contentTypeHeader) {
        console.log(contentTypeHeader);
        const defaultResult = {
            type: 'application/json',
            parameters: {
                charset: 'UTF-8'
            }
        };
        
        try {
            return contentTypeParser.parse(contentTypeHeader) || defaultResult;
        } catch (e) {
            console.warn("Error parsing Content-Type header: " + e);
            return defaultResult;
        }
    }

    static tryParseAsJson(body){
        try {
            return JSON.parse(body);
        } catch (e) {
            console.warn("Unexpected format of the acquire token response's body. Should be a JSON string but was: " + body);
            return null;
        }
    }

    static tryParseAsText(body){
        if (!(body && typeof body === 'string')){
            return null;
        }

        return TokenParser.getJsonFromParamString(body);
    }

    static getJsonFromParamString(query) {
        var result = {};
        query.split("&").forEach(function (part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    }

}

export default TokenParser;