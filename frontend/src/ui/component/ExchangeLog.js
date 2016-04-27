import React from 'react'

const ExchangeLog = React.createClass({
    render(){
        const {
            request,
            response
        } = this.props;
        return (
            <div className="exchange-log">
                {request && (
                    <div className="request">
                        <legend>Request</legend>
                        <pre>{JSON.stringify(request, undefined, 2)}</pre>
                    </div>
                )}
                {response && (
                    <div className="response">
                        <legend>Response</legend>
                        <pre>{JSON.stringify(response, undefined, 2)}</pre>
                    </div>
                )}
            </div>
        )
    }
});
// ExchangeLog.propTypes = {
//     request: React.PropTypes.shape(ReqonseType),
//     response: React.PropTypes.shape(ReqonseType)
// };

export default ExchangeLog;
