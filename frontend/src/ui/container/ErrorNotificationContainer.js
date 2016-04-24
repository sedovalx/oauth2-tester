import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import actionTypes from 'actions/actionTypes'
import ErrorNotification from 'component/ErrorNotification'

const mapStateToProps = state => ({
    lastError: state.errors.last
});

const mapDispatchToProps = dispatch => ({
    markErrorAsRead: error => dispatch(createAction(actionTypes.ERROR_HAS_BEEN_READ)(error))    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorNotification)
