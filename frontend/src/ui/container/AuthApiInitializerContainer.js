import { connect } from 'react-redux'
import AuthApiInitializer from 'component/AuthApiInitializer'
import asyncApiFetchUriCodeFlow from 'actions/asyncApiFetchUriCodeFlow'

const mapStateToProps = state => ({
    isServerSelected: state.servers.selected != null,
    selectedServerName: state.servers.selected ? state.servers.selected.name : null
});

const mapDispatchToProps = dispatch => ({
    onExecute: (name, scope) => {
        return dispatch(asyncApiFetchUriCodeFlow(name, scope, JSON.stringify({ serverName: name })))
            .then(result => {
                if (result.success) {
                    window.location.href = result.uri;
                }
            })
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthApiInitializer);

