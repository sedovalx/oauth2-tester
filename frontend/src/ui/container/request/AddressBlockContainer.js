import { reduxForm } from 'redux-form'
import { createAction } from 'redux-actions'
import actionTypes from 'actions/actionTypes'
import AddressBlock from 'component/request/AddressBlock'

function buildUri(uri, params) {
    let filteredParams = params.filter(p => p.key.value);
    if (filteredParams.length) {
        uri += '?';
        filteredParams.forEach(p => {
            uri += `${encodeURIComponent(p.key.value)}=${encodeURIComponent(p.value.value)}&`;
        });
        uri = uri.slice(0, -1);
    }
    return uri;
}

const mapStateToProps = state => ({
    methods: state.refs.httpMethods.items,
    lastParamsUpdate: state.formEx.requestEditor.lastParamsUpdate,
    initialValues: {
        uriWithParams: state.formEx.requestEditor.uriWithParams
    }
});

const mapDispatchToProps = dispatch => ({
    updateUri: (endpoint, params) => {
        return dispatch(createAction(actionTypes.REQUEST_URI_REBUILD)(buildUri(endpoint.value || endpoint.initialValue, params)))
    }     
});

export default reduxForm({
        form: 'address-editor',
        fields: ['uriWithParams']
    },
    mapStateToProps,
    mapDispatchToProps
)(AddressBlock);