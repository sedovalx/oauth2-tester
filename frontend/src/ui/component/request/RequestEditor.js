import React                    from 'react'
import Icon                     from 'react-fa'
import u                        from 'updeep'
import AddressBlockContainer    from '/container/request/AddressBlockContainer'
import KeyValueList             from '/component/request/KeyValueList'

function switchBoolState(editor, key) {
    editor.setState(u({[key]: !editor.state[key]}, editor.state));
}

function getRunTitle({shouldNavigate, acquireCode, acquireToken}) {
    if (shouldNavigate && acquireCode) {
        return {
            icon: 'globe',
            title: 'Request Authorization Code'
        }
    }

    if (shouldNavigate && acquireToken) {
        return {
            icon: 'globe',
            title: 'Request Authorization Token'
        }
    }

    if (!shouldNavigate && acquireToken) {
        return {
            icon: 'rocket',
            title: 'Request Authorization Token'
        }
    }

    return {
        icon: 'rocket',
        title: 'Send the request'
    };
}

const RequestEditor = React.createClass({
    getInitialState() {
        return {
            showHeaders: false,
            showParams: false
        }
    },
    render() {
        const {
            fields: {
                params,
                headers,
                body
            },
            method,
            requestParams,
            currentState,
            onRun,
            onChangeParams,
            onChangeHeaders,
            onChangeBody
        } = this.props;
        const paramsCount = params.length > 0 ? params.length - 1 : 0;
        const headersCount = headers.length > 0 ? headers.length - 1 : 0;
        const titleParams = getRunTitle(requestParams);
        return (
            <div className="request-editor">
                <form className="form-horizontal">
                    <AddressBlockContainer />
                    
                    <div className="commands btn-toolbar">
                        <div className="btn-group">
                            <button className="btn btn-default" type="button" onClick={() => switchBoolState(this, 'showParams')}>
                                <Icon name={this.state.showParams ? 'eye' : 'eye-slash'} /> URL Parameters ({paramsCount})
                            </button>
                            <button className="btn btn-default" type="button" onClick={() => switchBoolState(this, 'showHeaders')}>
                                <Icon name={this.state.showHeaders ? 'eye' : 'eye-slash'} /> Headers ({headersCount})
                            </button>
                        </div>
                        <div className="btn-group">
                            <button className="btn btn-primary" type="button" disabled={!currentState.server}
                                    onClick={() => onRun(currentState)}>
                                <Icon name={titleParams.icon} /> {titleParams.title}
                            </button>
                        </div>
                    </div>
                    
                    <div className="request-params">
                        <KeyValueList items={params} keyPlaceholder="URL Parameter Key" isVisible={this.state.showParams} onItemsChange={onChangeParams} />
                    </div>

                    <div className="request-headers">
                        <KeyValueList items={headers} keyPlaceholder="Header" isVisible={this.state.showHeaders} onItemsChange={onChangeHeaders} />
                    </div>

                    {method === 'POST' && (
                        <div className="body">
                            <textarea className="form-control" rows="10" {...body}
                                      placeholder="Request body" 
                                      onChange={event => {
                                         body.onChange(event);
                                         onChangeBody(event.target.value);
                                      }}/>
                        </div>
                    )}
                </form>
            </div>
        );
    }
});

export default RequestEditor;