import React from 'react'
import ReqonseType from 'props/ReqonseType'

function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

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
