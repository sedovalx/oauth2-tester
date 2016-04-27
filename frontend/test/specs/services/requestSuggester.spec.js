import should from 'should'
import { suggestUri } from '/services/requestSuggester'
import { flowTypes } from '/reducers/refs/flows'

const defs = {
    authEndpoint: 'https://some/address/auth',
    tokenEndpoint: 'https://some/address/token',
    clientID: 'client-id-123',
    clientSecret: 'client-secret-456',
    callbackUri: 'https://another/address/callback'
};

function prepareArgs({
    authEndpoint = defs.authEndpoint,
    tokenEndpoint = defs.tokenEndpoint,
    clientID = defs.clientID,
    clientSecret = defs.clientSecret,
    authCode = null,
    authToken = null,
    flowCode = flowTypes.CODE_FLOW,
    callbackUri = defs.callbackUri,
    username = null,
    password = null
} = {}) {
    return {
        server: {
            authEndpoint,
            tokenEndpoint,
            clientID,
            clientSecret,
            authCode,
            authToken
        },
        flow: {
            code: flowCode
        },
        callbackUri,
        username,
        password
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
    it('should return GET auth uri for CODE_FLOW and both code and token are absent', function(){
        const args = prepareArgs();
        const request = suggestUri(args.server, args.flow, args.callbackUri);

        expectRequestIsOk(request);
        should(request.method).be.equal('GET');
        should(request.fullUri).be.equal(`${defs.authEndpoint}?response_type=code&client_id=${defs.clientID}&redirect_uri=${encodeURIComponent(defs.callbackUri)}`);
        expectItems(request.queryParams, [
            {key: 'response_type', value: 'code'},
            {key: 'client_id', value: defs.clientID},
            {key: 'redirect_uri', value: defs.callbackUri}
        ]);
        expectItems(request.headers, [{key: 'Accept', value: 'application/json'}]);
        should(request.body).be.undefined();
    });

    it('should return POST token request for CODE_FLOW and code is present but token is absent', function(){
        const authCode = 'code-123';
        const args = prepareArgs({authCode: authCode});
        const request = suggestUri(args.server, args.flow, args.callbackUri);

        // expectRequestIsOk(request);
        // expect(request.method).to.eql('POST');
        // expect(request.fullUri).to.eql(`${defs.tokenEndpoint}?client_id=${defs.clientID}&client_secret=${defs.clientSecret}&grant_type=authorization_code&code=${authCode}&redirect_uri=${defs.callbackUri}`);
        
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
