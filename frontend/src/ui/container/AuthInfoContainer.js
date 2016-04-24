import { connect } from 'react-redux'
import AuthInfo from 'component/AuthInfo'

const mapStateToProps = state => ({
    code: state.current.server ? state.current.server.authCode : null,
    token: state.current.server ? state.current.server.authToken : null
});

export default connect(
    mapStateToProps
)(AuthInfo)
