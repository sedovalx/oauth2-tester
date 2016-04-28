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
        const isErrorResponse = response instanceof ErrorResponse;
        return (
            <div className="exchange-log">
                {request && (
                    <div className="request">
                        <legend>Request</legend>
                        <div className="header-block">
                            <pre>
                                <span>{request.method + ' ' + request.fullUri}</span>
                                {request.queryParams.length > 0 && (
                                    <span className="bold">{'Query parameters:'}</span>
                                )}
                                {request.queryParams.map(p => ` ${p.key}: ${p.value}\n`)}

                                {request.headers.length > 0 && (
                                    <span className="bold">{'Headers:'}</span>    
                                )}
                                {request.headers.map(h => ` ${h.key}: ${h.value}\n`)}
                            </pre>
                        </div>
                        {request.body && (
                            <dev className="body-block">
                                <pre><code>{request.body}</code></pre>
                            </dev>
                        )}
                    </div>
                )}
                {response && !isErrorResponse && (
                    <div className="response">
                        <legend>Response</legend>
                        <div className="header-block">
                            <pre>
                                <span>{response.status.protocolVersion + ' ' + response.status.code + ' ' + response.status.reasonPhrase}</span>
                                {response.uri && (
                                    <span>{response.uri}</span>
                                )}
                                {response.headers.length > 0 && (
                                    <span className="bold">{'Headers:'}</span>
                                )}
                                {response.headers.map(h => ` ${h.key}: ${h.value}\n`)}
                            </pre>
                        </div>
                        {response.body && (
                            <dev className="body-block">
                                <pre><code>{response.body}</code></pre>
                            </dev>
                        )}
                    </div>
                )}
                {response && isErrorResponse && (
                    <div className="error">
                        <legend>Error</legend>
                        <pre>
                            <span>{response.message}</span>
                            <span>{response.errorClass}</span>
                            <span>{response.errorText}</span>
                        </pre>
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
