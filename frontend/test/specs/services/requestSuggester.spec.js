import should           from 'should'
import { suggestUri }   from '/services/requestSuggester'
import { flowTypes }    from '/reducers/refs/flows'

const defs = {
    authEndpoint: 'https://some/address/auth',
    tokenEndpoint: 'https://some/address/token',
    clientID: 'client-id-123',
    clientSecret: 'client-secret-456',
    callbackUri: 'https://another/address/callback',
    username: 'user-1',
    password: 'p@s$w0rd'
};

function prepareServer({
    authEndpoint = defs.authEndpoint,
    tokenEndpoint = defs.tokenEndpoint,
    clientID = defs.clientID,
    clientSecret = defs.clientSecret,
    authCode = null,
    authToken = null
} = {}) {
    return {
        server: {
            authEndpoint,
            tokenEndpoint,
            clientID,
            clientSecret,
            authCode,
            authToken
        }
    }
}

function expectRequestIsOk(request) {
    should(request).be.an.Object();
    should(request.queryParams).be.an.Array();
    should(request.headers).be.an.Array();
}

function expectItems(array, items) {
    should(array).have.length(items.length);
    items.forEach(i => should(array).containEql(i));
}

describe('suggestUri()', function(){
    describe('# CODE_FLOW', function(){
        it('should return GET request for auth code', function(){
            const args = prepareServer();
            const request = suggestUri(args.server, { code: flowTypes.CODE_FLOW }, defs.callbackUri);

            expectRequestIsOk(request);
            should(request.method).be.equal('GET');
            should(request.fullUri).be.equal(`${defs.authEndpoint}?response_type=code&client_id=${defs.clientID}&redirect_uri=${encodeURIComponent(defs.callbackUri)}`);
            expectItems(request.queryParams, [
                {key: 'response_type', value: 'code'},
                {key: 'client_id', value: defs.clientID},
                {key: 'redirect_uri', value: defs.callbackUri}
            ]);
            should(request.headers).be.empty();
            should(request.body).be.undefined();
            should(request.shouldNavigate).be.true();
            should(request.acquireCode).be.true();
            should(request.acquireToken).be.false();
        });

        it('should return POST request for auth token', function(){
            const authCode = 'code-123';
            const args = prepareServer({authCode});
            const request = suggestUri(args.server, { code: flowTypes.CODE_FLOW }, defs.callbackUri);

            expectRequestIsOk(request);
            should(request.method).be.equal('POST');
            should(request.fullUri).be .equal(
                `${defs.tokenEndpoint}?grant_type=authorization_code&code=${authCode}&client_id=${defs.clientID}&client_secret=${defs.clientSecret}&redirect_uri=${encodeURIComponent(defs.callbackUri)}`
            );
            expectItems(request.queryParams, [
                { key: 'client_id', value: defs.clientID },
                { key: 'client_secret', value: defs.clientSecret },
                { key: 'grant_type', value: 'authorization_code' },
                { key: 'code', value: authCode },
                { key: 'redirect_uri', value: defs.callbackUri }
            ]);
            expectItems(request.headers, [
                { key: 'Content-Type', value: 'application/x-www-form-urlencoded' },
                { key: 'Accept', value: 'application/json' }
            ]);
            should(request.body).be.undefined();
            should(request.shouldNavigate).be.false();
            should(request.acquireCode).be.false();
            should(request.acquireToken).be.true();
        });

        it('should return GET request for an API', function(){
            const authToken = 'token-123';
            const args = prepareServer({authToken});
            const request = suggestUri(args.server, { code: flowTypes.CODE_FLOW }, defs.callbackUri);

            expectRequestIsOk(request);
            should(request.method).be.equal('GET');
            should(request.fullUri).be.empty();
            should(request.queryParams).be.empty();
            expectItems(request.headers, [
                { key: 'Authorization', value: `Bearer ${authToken}` }
            ]);
            should(request.body).be.undefined();
            should(request.shouldNavigate).be.false();
            should(request.acquireCode).be.false();
            should(request.acquireToken).be.false();
        });
    });

    describe("# IMPLICIT_FLOW", function(){
        it('should return GET request for the token', function(){
            const args = prepareServer();
            const request = suggestUri(args.server, { code: flowTypes.IMPLICIT_FLOW }, defs.callbackUri);

            expectRequestIsOk(request);
            should(request.method).be.equal('GET');
            should(request.fullUri).be.equal(
                `${defs.authEndpoint}?response_type=token&client_id=${defs.clientID}&redirect_uri=${encodeURIComponent(defs.callbackUri)}`
            );
            expectItems(request.queryParams, [
                { key: 'response_type', value: 'token' },
                { key: 'client_id', value: defs.clientID },
                { key: 'redirect_uri', value: defs.callbackUri }
            ]);
            expectItems(request.headers, [
                { key: 'Content-Type', value: 'application/x-www-form-urlencoded'}
            ]);
            should(request.body).be.undefined();
            should(request.shouldNavigate).be.true();
            should(request.acquireCode).be.false();
            should(request.acquireToken).be.true();
        });

        it('should return GET request for an API call', function(){
            const authToken = 'token-123';
            const args = prepareServer({authToken});
            const request = suggestUri(args.server, { code: flowTypes.IMPLICIT_FLOW }, defs.callbackUri);

            expectRequestIsOk(request);
            should(request.method).be.equal('GET');
            should(request.fullUri).be.empty();
            should(request.queryParams).be.empty();
            expectItems(request.headers, [
                { key: 'Authorization', value: `Bearer ${authToken}` }
            ]);
            should(request.body).be.undefined();
            should(request.shouldNavigate).be.false();
            should(request.acquireCode).be.false();
            should(request.acquireToken).be.false();
        });
    });

    describe('# RESOURCE_FLOW', function(){
        it('should return POST request for the token', function(){
            const args = prepareServer();
            const request = suggestUri(args.server, { code: flowTypes.RESOURCE_FLOW }, defs.callbackUri, defs.username, defs.password);

            expectRequestIsOk(request);
            should(request.method).be.equal('POST');
            should(request.fullUri).be.equal(
                `${defs.tokenEndpoint}?grant_type=password&username=${encodeURIComponent(defs.username)}&password=${encodeURIComponent(defs.password)}&client_id=${defs.clientID}`
            );
            expectItems(request.queryParams, [
                { key: 'grant_type', value: 'password' },
                { key: 'username', value: defs.username },
                { key: 'password', value: defs.password },
                { key: 'client_id', value: defs.clientID }
            ]);
            expectItems(request.headers, [
                { key: 'Content-Type', value: 'application/x-www-form-urlencoded'},
                { key: 'Accept', value: 'application/json' }
            ]);
            should(request.body).be.undefined();
            should(request.shouldNavigate).be.false();
            should(request.acquireCode).be.false();
            should(request.acquireToken).be.true();
        });
    });

    describe('# CLIENT_FLOW', function(){
        it('should return POST request for the token', function(){
            const args = prepareServer();
            const request = suggestUri(args.server, { code: flowTypes.CLIENT_FLOW }, defs.callbackUri);

            expectRequestIsOk(request);
            should(request.method).be.equal('POST');
            should(request.fullUri).be.equal(
                `${defs.tokenEndpoint}?grant_type=client_credentials&client_id=${defs.clientID}&client_secret=${defs.clientSecret}`
            );
            expectItems(request.queryParams, [
                { key: 'grant_type', value: 'client_credentials' },
                { key: 'client_id', value: defs.clientID },
                { key: 'client_secret', value: defs.clientSecret }
            ]);
            expectItems(request.headers, [
                { key: 'Content-Type', value: 'application/x-www-form-urlencoded'},
                { key: 'Accept', value: 'application/json' }
            ]);
            should(request.body).be.undefined();
            should(request.shouldNavigate).be.false();
            should(request.acquireCode).be.false();
            should(request.acquireToken).be.true();
        });
    });
});

/**
 * code_flow:
 *  - code and token are absent
 *  - code is present, token is absent
 *  - token is present
 *  - code is null and authEndpoint is null
 * implicit_flow:
 *  - token is absent
 *  - token is present
 * resource_flow:
 *  - token is absent
 *  - token is present
 *  - username is null
 *  - password is null
 * client_flow:
 *  - token is absent
 *  - token is present
 * any flow:
 *  - server is null
 *  - tokenEndpoint is null
 *  - clientID is null
 *  - clientSecret is null
 *  - callbackUri is null
 */
