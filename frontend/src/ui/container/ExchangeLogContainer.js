import { connect } from 'react-redux'

import ExchangeLog from '/component/ExchangeLog'

const mapStateToProps = state => ({
    request: state.exchangeLog.request,    
    response: state.exchangeLog.response,
    isBusy: state.exchangeLog.isBusy
});

export default connect(
    mapStateToProps
)(ExchangeLog)
