import { connect } from 'react-redux'
import AuthApiInitializer from 'component/AuthApiInitializer'

const mapStateToProps = state => ({
    isServerSelected: state.servers.selected != null
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthApiInitializer);
