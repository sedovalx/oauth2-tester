import should       from 'should'
import TokenParser  from '/services/TokenParser'

describe('TokenParser', function(){
    describe('# parseBody', function(){
        const expectedToken = 'token23098203984234';
        const expectedTokenType = 'bearer';

        it('should return token object from application/json body', function(){
            const tokenObj = TokenParser.parseBody(
                'application/json',
                JSON.stringify({ access_token: expectedToken, token_type: expectedTokenType })
            );

            should(tokenObj).be.an.Object();
            should(tokenObj.access_token).be.equal(expectedToken);
            should(tokenObj.token_type).be.equal(expectedTokenType);
        });

        it('should return token object from text/plain body', function(){
            const tokenObj = TokenParser.parseBody(
                'text/plain',
                `access_token=${expectedToken}&token_type=${expectedTokenType}`
            );

            should(tokenObj).be.an.Object();
            should(tokenObj.access_token).be.equal(expectedToken);
            should(tokenObj.token_type).be.equal(expectedTokenType);
        });

        it('should return null from other content types', function () {
            const tokenObj = TokenParser.parseBody(
                'text/html',
                '<some>value</some>'
            );

            should(tokenObj).be.null();
        });
        
        it('should return token for json body without content type in header', function(){
            const tokenObj = TokenParser.parseBody(
                undefined,
                JSON.stringify({ access_token: expectedToken, token_type: expectedTokenType })
            );

            should(tokenObj).be.an.Object();
            should(tokenObj.access_token).be.equal(expectedToken);
            should(tokenObj.token_type).be.equal(expectedTokenType);
        });
    });
});
