import { connect } from 'react-redux'
import AuthInfo from 'component/AuthInfo'

const mapStateToProps = state => ({
    code: state.current.auth.code,
    token: state.current.auth.token
});

export default connect(
    mapStateToProps
)(AuthInfo)
