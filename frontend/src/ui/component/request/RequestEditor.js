import React from 'react'
import Icon from 'react-fa'
import u from 'updeep'
import AddressBlockContainer from 'container/request/AddressBlockContainer'
import KeyValueList from 'component/request/KeyValueList'

function switchBoolState(editor, key) {
    editor.setState(u({[key]: !editor.state[key]}, editor.state));
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
                method,
                endpoint,
                params,
                headers,
                body
            }
        } = this.props;
        const paramsCount = params.length > 0 ? params.length - 1 : 0;
        const headersCount = headers.length > 0 ? headers.length - 1 : 0;
        return (
            <div className="request-editor">
                <form className="form-horizontal">
                    <AddressBlockContainer method={method} endpoint={endpoint} params={params} />
                    
                    <div className="commands">
                        <button className="btn btn-info" type="button" onClick={() => switchBoolState(this, 'showParams')}>
                            <Icon name={this.state.showParams ? 'eye' : 'eye-slash'} /> URL Parameters ({paramsCount})
                        </button>
                        <button className="btn btn-success" type="button" onClick={() => switchBoolState(this, 'showHeaders')}>
                            <Icon name={this.state.showHeaders ? 'eye' : 'eye-slash'} /> Headers ({headersCount})
                        </button>
                    </div>
                    
                    <div className="request-params">
                        <KeyValueList items={params} keyPlaceholder="URL Parameter Key" isVisible={this.state.showParams} />
                    </div>

                    <div className="request-headers">
                        <KeyValueList items={headers} keyPlaceholder="Header" isVisible={this.state.showHeaders} />
                    </div>

                    <div className="body">

                    </div>
                    <div className="commands">

                    </div>
                </form>
            </div>
        );
    }
});

export default RequestEditor;