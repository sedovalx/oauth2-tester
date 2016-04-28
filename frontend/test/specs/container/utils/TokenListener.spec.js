import should                   from 'should'
import { mapDispatchToProps }   from '/container/utils/TokenListener'

describe('TokenListener', function(){
    describe('# mapDispatchToProps', function(){
        const expectedToken = '123';
        const expectedTokenType = '456';
        const responseBody = `{"access_token": "${expectedToken}", "token_type": "${expectedTokenType}"}`;

        const dispatchExpect = callback => action => {
            should(action).be.an.Object();
            should(action.server).be.an.Object();
            should(action.server.authToken).be.equal(expectedToken);
            should(action.server.tokenType).be.equal(expectedTokenType);
            callback();
        };

        it('should call dispatch server save action if acquire token and response body contains token', function(){
            let wasExecuted = false;
            const props = mapDispatchToProps(dispatchExpect(() => wasExecuted = true));
            props.onResponseUpdate({ acquireToken: true }, { body: responseBody }, {});
            should(wasExecuted).be.true();
        });
        
        it('should not dispatch server save if response body is not json', function(){
            let wasExecuted = false;
            const props = mapDispatchToProps(dispatchExpect(() => wasExecuted = true));
            props.onResponseUpdate({ acquireToken: true }, { body: "not a json" }, {});
            should(wasExecuted).be.false();
        });
        
        it('should not dispatch server save if it was not token acquire request', function(){
            let wasExecuted = false;
            const props = mapDispatchToProps(dispatchExpect(() => wasExecuted = true));
            props.onResponseUpdate({ acquireToken: false }, { body: 'does not matter' }, {});
            should(wasExecuted).be.false();
        })
    });
});
