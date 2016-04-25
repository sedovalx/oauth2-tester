import { reduxForm } from 'redux-form'
import { createAction } from 'redux-actions'
import { createSelector } from 'reselect'
import actionTypes from 'actions/actionTypes'
import AddressBlock from 'component/request/AddressBlock'

const getMethod = createSelector(
    [state => state.current.request.method],
    (method) => method
);

const getFullUri = createSelector([state => state.current.requestUri], _ => _);

const mapStateToProps = state => ({
    methods: state.refs.httpMethods.items,
    initialValues: {
        fullUri: getFullUri(state),
        method: getMethod(state)
    }
});

const mapDispatchToProps = dispatch => ({
    onChangeMethod: (newMethod) => {
        return dispatch(createAction(actionTypes.REQUEST_UPDATE_METHOD)(newMethod));
    },
    onChangeUri: (newUri) => {
        return dispatch(createAction(actionTypes.REQUEST_UPDATE_URI)(newUri));
    }
});

export default reduxForm({
        form: 'address-editor',
        fields: ['fullUri', 'method']
    },
    mapStateToProps,
    mapDispatchToProps
)(AddressBlock);