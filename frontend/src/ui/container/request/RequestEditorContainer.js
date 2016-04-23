import { reduxForm } from 'redux-form'
import RequestEditor from 'component/request/RequestEditor'
import { flowTypes } from 'reducers/refs/flows'

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
        auth: {
            code,
            token,
            username,
            password
        }
    } = state.current;
    const callbackUri = state.settings.callbackUri;

    if (!(server && flow)) {
        return {
            initialValues
        };
    }

    if (token) {
        initialValues.headers.push({ key: 'Authorization', value: 'Bearer ' + token })
    }

    if (flow.code === flowTypes.CODE_FLOW) {
        if (!(code && token)) {
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
    return {
        initialValues
    };
};

export default reduxForm({
        form: 'request-editor',
        fields: ['method', 'endpoint', 'params', 'headers', 'body']
    },
    mapStateToProps
)(RequestEditor)

