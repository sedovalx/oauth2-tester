import React from 'react'
import ReqonseType from 'props/ReqonseType'

const ExchangeLog = React.createClass({
    render(){
        const {
            request,
            response
        } = this.props;
        return (
            <div className="exchange-log">
                <div className="request">{request && JSON.stringify(request)}</div>
                <div className="response">{response && JSON.stringify(response)}</div>
            </div>
        )
    }
});
// ExchangeLog.propTypes = {
//     request: React.PropTypes.shape(ReqonseType),
//     response: React.PropTypes.shape(ReqonseType)
// };

export default ExchangeLog;
