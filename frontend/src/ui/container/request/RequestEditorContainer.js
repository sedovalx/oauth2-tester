import { reduxForm }        from 'redux-form'
import { createSelector }   from 'reselect'
import { createAction }     from 'redux-actions'

import actionTypes          from '/actions/actionTypes'
import RequestEditor        from '/component/request/RequestEditor'
import { runRequest }       from '/services/requestRunner'

function addEmptyParameter(elements) {
    if (!elements.length || elements[elements.length - 1].value) {
        elements.push({});
    }
    return elements;
}

const getParams = createSelector(
    [state => state.current.request.queryParams],
    params => addEmptyParameter([].concat(params))
);

const getHeaders = createSelector([state => state.current.request.headers], function(headers){
    return addEmptyParameter([].concat(headers));
});

const getBody = createSelector([state => state.current.request.body], body => body || '');

const getCurrentState = createSelector([state => state.current], _ => _);

const mapStateToProps = state => {
    return {
        initialValues: {
            params: getParams(state),
            headers: getHeaders(state),
            body: getBody(state)
        },
        method: state.current.request.method,
        requestParams: {
            shouldNavigate: state.current.request.shouldNavigate,
            acquireCode: state.current.request.acquireCode,
            acquireToken: state.current.request.acquireToken
        },
        currentState: getCurrentState(state)
    };
};

const mapDispatchToProps = dispatch => ({
    onChangeParams: (params) => {
        return dispatch(createAction(actionTypes.REQUEST_UPDATE_PARAMS)(params));
    },
    onChangeHeaders: (headers) => {
        return dispatch(createAction(actionTypes.REQUEST_UPDATE_HEADERS)(headers));
    },
    onChangeBody: (body) => {
        return dispatch(createAction(actionTypes.REQUEST_UPDATE_BODY)(body));
    },
    onRun: (currentState) => {
        return runRequest(dispatch, currentState);
    }
});

export default reduxForm({
        form: 'request-editor',
        fields: [
            'params[].key',
            'params[].value',
            'headers[].key',
            'headers[].value',
            'body'
        ]
    },
    mapStateToProps,
    mapDispatchToProps
)(RequestEditor)

