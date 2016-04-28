import should                   from 'should'
import { mapDispatchToProps }   from '/container/utils/TokenListener'
import Response                 from '/rest/Response'

describe('TokenListener', function(){
    describe('# mapDispatchToProps', function(){
        const expectedToken = '123';
        const expectedTokenType = '456';
        const responseBody = `{"access_token": "${expectedToken}", "token_type": "${expectedTokenType}"}`;
        
        function createResponseStub(body, contentType) {
            const response = new Response({body});
            if (contentType) {
                response.headers.push({key: 'Content-Type', value: contentType});
            }
            return response;
        }

        const dispatchExpect = callback => action => {
            should(action).be.an.Object();
            should(action.server).be.an.Object();
            should(action.server.authToken).be.equal(expectedToken);
            should(action.server.tokenType).be.equal(expectedTokenType);
            callback();
        };

        it('should call dispatch server save action if acquire token and response JSON body contains token', function(){
            let wasExecuted = false;
            const props = mapDispatchToProps(dispatchExpect(() => wasExecuted = true));
            props.onResponseUpdate({ acquireToken: true }, createResponseStub(responseBody, 'application/json'), {});
            should(wasExecuted).be.true();
        });

        it('should call dispatch server save action if acquire token and response PLAIN body contains token', function(){
            let wasExecuted = false;
            const props = mapDispatchToProps(dispatchExpect(() => wasExecuted = true));
            props.onResponseUpdate({ acquireToken: true }, createResponseStub(`access_token=${expectedToken}&token_type=${expectedTokenType}`, 'text/plain'), {});
            should(wasExecuted).be.true();
        });
        
        it('should not dispatch server save if response body is not json', function(){
            let wasExecuted = false;
            const props = mapDispatchToProps(dispatchExpect(() => wasExecuted = true));
            props.onResponseUpdate({ acquireToken: true }, createResponseStub('some not a json text 0x2323423423123123d1231233'), {});
            should(wasExecuted).be.false();
        });
        
        it('should not dispatch server save if it was not token acquire request', function(){
            let wasExecuted = false;
            const props = mapDispatchToProps(dispatchExpect(() => wasExecuted = true));
            props.onResponseUpdate({ acquireToken: false }, createResponseStub(responseBody), {});
            should(wasExecuted).be.false();
        })
    });
});
