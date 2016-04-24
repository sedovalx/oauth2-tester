import React from 'react'
import Icon from 'react-fa'
import u from 'updeep'
import classNames from 'classnames'
import AddressBlockContainer from 'container/request/AddressBlockContainer'

function addElement(elements, clickedIdx) {
    if (clickedIdx === elements.length - 1) {
        elements.addField()
    }
}

function switchParamsState(editor, params) {
    const showParams = !editor.state.showParams;
    if (showParams && (!params.length || params[params.length - 1].value)) {
        params.addField();
    }
    editor.setState(u({showParams: showParams}, editor.state));
}

function switchHeadersState(editor, headers) {
    const showHeaders = !editor.state.showHeaders;
    if (showHeaders && (!headers.length || headers[headers.length - 1].value)){
        headers.addField();
    }
    editor.setState(u({showHeaders: showHeaders}, editor.state));
}

function switchBoolState(editor, key) {
    editor.setState(u({[key]: !editor.state[key]}, editor.state));
}

function addEmptyParameter(elements) {
    if (!elements.length || elements[elements.length - 1].value) {
        elements.addField();
    }
}

function getNonEmptyCount(elements) {
    return elements.filter(e => e.value).length;
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
            },
            onParamsChange
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
                    
                    {this.state.showParams && (
                        <div className="request-params">
                            {params.map((p, idx) => {
                                return (
                                    <div key={idx} className="form-inline param-line">
                                        <input type="text" className="form-control key" {...p.key}
                                               placeholder="URL Parameter Key"
                                               onClick={() => addElement(params, idx)}
                                               onFocus={event => {
                                                 p.key.onFocus(event);
                                                 addElement(params, idx);
                                               }}/>
                                        <input type="text" className="form-control value" {...p.value}
                                               placeholder="Value"
                                               onClick={() => addElement(params, idx)}
                                               onFocus={event => {
                                                 p.value.onFocus(event);
                                                 addElement(params, idx);
                                               }} />
                                        {idx !== params.length - 1 && (
                                            <button className="btn btn-default no-borders" type="button" title="Remove" onClick={() => params.removeField(idx)}>
                                                <Icon name="trash-o" />
                                            </button>
                                        )}
                                    </div>
                                )
                            })}
                        </div>    
                    )}
                    
                    {this.state.showHeaders && (
                        <div className="request-headers">
                            {headers.map((h, idx) => (
                                <div key={idx} className="form-inline param-line">
                                    <input type="text" className="form-control key" {...h.key}
                                           placeholder="Header"
                                           onClick={() => addElement(headers, idx)}
                                           onFocus={event => {
                                             h.key.onFocus(event);
                                             addElement(headers, idx);
                                           }}/>
                                    <input type="text" className="form-control value" {...h.value}
                                           placeholder="Value"
                                           onClick={() => addElement(headers, idx)}
                                           onFocus={event => {
                                             h.value.onFocus(event);
                                             addElement(headers, idx);
                                           }}
                                         />
                                    {idx !== params.length - 1 && (
                                        <button className="btn btn-default no-borders" type="button" title="Remove" onClick={() => headers.removeField(idx)}>
                                            <Icon name="trash-o" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="headers">

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