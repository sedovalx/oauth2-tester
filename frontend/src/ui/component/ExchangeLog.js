import React            from 'react'
import Request          from '/rest/Request'
import Response         from '/rest/Response'
import ErrorResponse    from '/rest/ErrorResponse'

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
ExchangeLog.propTypes = {
    request: React.PropTypes.instanceOf(Request),
    response: React.PropTypes.oneOfType([
        React.PropTypes.instanceOf(Response),
        React.PropTypes.instanceOf(ErrorResponse)
    ])
};  

export default ExchangeLog;
