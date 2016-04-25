import { reduxForm } from 'redux-form'
import { createAction } from 'redux-actions'
import actionTypes from 'actions/actionTypes'
import AddressBlock from 'component/request/AddressBlock'
import Request from 'services/Request'

function buildUri(uri, params) {
    return new Request({baseUri: uri, queryParams: params.filter(p => p.key.value).map(p => ({ key: p.key.value, value: p.value.value }))}).fullUri;
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