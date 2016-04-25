import { reduxForm } from 'redux-form'
import RequestEditor from 'component/request/RequestEditor'
import { flowTypes } from 'reducers/refs/flows'
import { runRequest } from 'services/requestRunner'

function addEmptyParameter(elements) {
    if (!elements.length || elements[elements.length - 1].value) {
        elements.push({});
    }
}

const mapStateToProps = state => {
    const initialValues = {
        method: 'GET',
        endpoint: "",
        params: [],
        headers: [],
        body: ""
    };
    const {
        flow,
        server,
    } = state.current;
    const code = server ? server.authCode : null;
    const token = server ? server.authToken : null;
    const callbackUri = state.settings.callbackUri;
    
    // const request = Request.buildFromState(server, flow, callbackUri, state.settings.username, state.settings.password);

    if (server && flow) {
        if (token) {
            initialValues.headers.push({ key: 'Authorization', value: 'Bearer ' + token })
        }

        if (flow.code === flowTypes.CODE_FLOW) {
            if (!(code || token)) {
                initialValues.method = 'GET';
                initialValues.endpoint = server.authEndpoint;
                initialValues.params.push({ key: 'response_type', value: 'code' });
                initialValues.params.push({ key: 'client_id', value: server.clientID });
                initialValues.params.push({ key: 'redirect_uri', value: callbackUri });
            } else if (code) {
                initialValues.method = 'POST';
                initialValues.endpoint = server.tokenEndpoint;
                initialValues.params.push({ key: 'client_id', value: server.clientID });
                initialValues.params.push({ key: 'redirect_uri', value: callbackUri });
                initialValues.params.push({ key: 'client_secret', value: server.clientSecret });
                initialValues.params.push({ key: 'grant_type', value: 'authorization_code' });
                initialValues.params.push({ key: 'code', value: code });
            }
        }
        if (flow.code === flowTypes.CLIENT_FLOW) {
            if (!token) {
                initialValues.method = 'POST';
                initialValues.endpoint = server.tokenEndpoint;
                initialValues.params.push({ key: 'grant_type', value: 'client_credentials' });
                initialValues.params.push({ key: 'client_id', value: server.clientID });
                initialValues.params.push({ key: 'client_secret', value: server.clientSecret });
            }
        }
        if (flow.code === flowTypes.RESOURCE_FLOW) {
            if (!token) {
                initialValues.method = 'POST';
                initialValues.endpoint = server.tokenEndpoint;
                initialValues.params.push({ key: 'client_id', value: server.clientID });
                initialValues.params.push({ key: 'username', value: username });
                initialValues.params.push({ key: 'password', value: password });
            }
        }

        addEmptyParameter(initialValues.params);
        addEmptyParameter(initialValues.headers);
    }

    return {
        initialValues,
        uriWithParams: state.formEx.requestEditor.uriWithParams,
        currentState: state.current
    };
};

const mapDispatchToProps = dispatch => ({
    onRun: (currentState, method, uri, headers) => {
        return runRequest({dispatch, currentState, method, uri, headers});
    }
});

export default reduxForm({
        form: 'request-editor',
        fields: [
            'method',
            'endpoint',
            'params[].key',
            'params[].value',
            'headers[].key',
            'headers[].key',
            'body'
        ]
    },
    mapStateToProps,
    mapDispatchToProps
)(RequestEditor)

