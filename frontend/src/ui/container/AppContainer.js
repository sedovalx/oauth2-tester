import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import App from 'component/App'
import actionTypes from 'actions/actionTypes'

const mapStateToProps = state => ({
    state
});

const mapDispatchToProps = dispatch => ({
    onInit: (state) => {
        return dispatch(createAction(actionTypes.DEFAULT_STATE)(state))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
