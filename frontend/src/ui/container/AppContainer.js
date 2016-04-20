import { connect } from 'react-redux'
import App from 'component/App'
import asyncApiFetchSettings from 'actions/asyncApiFetchSettings'

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onInit: () => {
        return dispatch(asyncApiFetchSettings())
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
